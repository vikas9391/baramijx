require('dotenv').config();
const express = require('express');
const cors = require('cors');
const crypto = require('crypto');
const { Pool } = require('pg');

const app = express();
app.use(express.json({ limit: '100kb' }));

// ---- CORS ----
const allowedOrigins = (process.env.FRONTEND_ORIGINS || '')
  .split(',')
  .map((o) => o.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.length === 0 || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
  })
);

const GROQ_API_KEY = process.env.GROQ_API_KEY;
const MODEL = process.env.GROQ_MODEL || 'llama-3.3-70b-versatile';
const DATABASE_URL = process.env.DATABASE_URL;
const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const SESSION_SECRET = process.env.SESSION_SECRET;

const pool = DATABASE_URL
  ? new Pool({
      connectionString: DATABASE_URL,
      ssl: { rejectUnauthorized: false },
      max: 5,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 10000,
    })
  : null;

async function initDatabase() {
  if (!pool) {
    console.warn('DATABASE_URL is not configured; database features are disabled.');
    return;
  }

  await pool.query(`
    CREATE TABLE IF NOT EXISTS chat_conversations (
      id BIGSERIAL PRIMARY KEY,
      session_id VARCHAR(128),
      language VARCHAR(5) NOT NULL DEFAULT 'en',
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS chat_messages (
      id BIGSERIAL PRIMARY KEY,
      conversation_id BIGINT NOT NULL REFERENCES chat_conversations(id) ON DELETE CASCADE,
      role VARCHAR(20) NOT NULL CHECK (role IN ('user', 'assistant')),
      content TEXT NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );

    CREATE INDEX IF NOT EXISTS idx_chat_messages_conversation
      ON chat_messages(conversation_id, created_at);
    CREATE INDEX IF NOT EXISTS idx_chat_conversations_created
      ON chat_conversations(created_at DESC);

    CREATE TABLE IF NOT EXISTS problem_reports (
      id BIGSERIAL PRIMARY KEY,
      name VARCHAR(200) NOT NULL,
      commune VARCHAR(200) NOT NULL,
      description TEXT NOT NULL,
      language VARCHAR(5) NOT NULL DEFAULT 'en',
      status VARCHAR(30) NOT NULL DEFAULT 'new',
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );

    CREATE INDEX IF NOT EXISTS idx_problem_reports_created
      ON problem_reports(created_at DESC);
    CREATE INDEX IF NOT EXISTS idx_problem_reports_status
      ON problem_reports(status);
  `);

  console.log('PostgreSQL database initialized.');
}

function safeEqual(a, b) {
  if (!a || !b) return false;
  const aa = Buffer.from(String(a));
  const bb = Buffer.from(String(b));
  return aa.length === bb.length && crypto.timingSafeEqual(aa, bb);
}

function makeAdminToken() {
  return crypto
    .createHmac('sha256', SESSION_SECRET || '')
    .update(String(ADMIN_USERNAME || ''))
    .digest('hex');
}

function parseCookies(header) {
  const cookies = {};
  for (const part of (header || '').split(';')) {
    const [key, ...value] = part.trim().split('=');
    if (key) cookies[key] = decodeURIComponent(value.join('='));
  }
  return cookies;
}

function isAdminAuthenticated(req) {
  if (!ADMIN_USERNAME || !ADMIN_PASSWORD || !SESSION_SECRET) return false;
  const cookies = parseCookies(req.headers.cookie);
  const raw = cookies.admin_session || '';
  const [username, signature] = raw.split('.');
  return username === ADMIN_USERNAME && safeEqual(signature, makeAdminToken());
}

function requireAdmin(req, res, next) {
  if (!isAdminAuthenticated(req)) {
    return res.status(401).json({ error: 'Unauthorized.' });
  }
  next();
}

function normalizeLanguage(language) {
  return ['ar', 'fr', 'en'].includes(language) ? language : 'en';
}

// ---- System prompt: scopes the assistant strictly to the campaign ----
const SYSTEM_PROMPTS = {
  ar: `أنت المستشار الرقمي الرسمي لحملة عبد المنعم الزويني، مرشح حزب PML (الحزب الليبرالي المغربي) بدائرة مراكش المنارة.
تجاوب حصرياً على الأسئلة المتعلقة بـ:
- برنامج المرشح الانتخابي (الصحة، البنية التحتية، التعليم، تشغيل الشباب)
- سيرة عبد المنعم الزويني ورؤيته السياسية
- قضايا دائرة مراكش المنارة (سيدي الزوين، الاوداية، ايت ايمور، اكفاي، المحاميد، المسيرة، السعادة...)
- حزب PML ومبادئه

إذا كان السؤال خارج هذا النطاق (مواضيع عامة، سياسة دولية، مرشحين آخرين، أسئلة تقنية غير متعلقة، إلخ)، اعتذر بأدب وأوضح أنك مخصص فقط لأسئلة تخص حملة عبد المنعم الزويني وبرنامجه، ووجّه المستخدم لطرح سؤال متعلق بالحملة.
كن دقيقاً، محترماً، ومقتضباً (3-5 جمل كحد أقصى ما لم يُطلب تفصيل أكثر). لا تخترع وعوداً أو أرقاماً غير مذكورة في السياق.`,
  fr: `Vous êtes le conseiller numérique officiel de la campagne d'Abdelmounaim Zouini, candidat du parti PML (Parti Marocain Libéral) dans la circonscription de Marrakech-Menara.
Répondez EXCLUSIVEMENT aux questions concernant :
- Le programme électoral du candidat (santé, infrastructure, éducation, emploi des jeunes)
- Le parcours et la vision politique d'Abdelmounaim Zouini
- Les enjeux locaux de Marrakech-Menara (Sidi Zouine, Oudaïa, Aït Imour, Akfay, Mhamid, Massira, Saada...)
- Le parti PML et ses principes

Si la question sort de ce cadre (sujets généraux, politique internationale, autres candidats, questions techniques non liées, etc.), déclinez poliment en précisant que vous êtes dédié uniquement aux questions sur la campagne d'Abdelmounaim Zouini et son programme, et invitez l'utilisateur à poser une question liée à la campagne.
Soyez précis, respectueux et concis (3-5 phrases maximum sauf si plus de détail est demandé). N'inventez jamais de promesses ou chiffres non mentionnés dans le contexte.`,
  en: `You are the official digital advisor for the campaign of Abdelmounaim Zouini, PML party (Moroccan Liberal Party) candidate for the Marrakech-Menara district.
Answer EXCLUSIVELY questions about:
- The candidate's electoral program (healthcare, infrastructure, education, youth employment)
- Abdelmounaim Zouini's background and political vision
- Local issues in Marrakech-Menara (Sidi Zouine, Oudaya, Ait Imour, Akfay, Mhamid, Massira, Saada...)
- The PML party and its principles

If a question falls outside this scope (general topics, international politics, other candidates, unrelated technical questions, etc.), politely decline, explain that you are dedicated only to questions about Abdelmounaim Zouini's campaign and program, and invite the user to ask a campaign-related question.
Be accurate, respectful, and concise (3-5 sentences max unless more detail is requested). Never invent promises or figures not present in the context.`,
};

const CAMPAIGN_CONTEXT = `
Candidate: Abdelmounaim Zouini, PML (Parti Marocain Libéral / الحزب الليبرالي المغربي), Marrakech-Menara district.
Program pillars:
1. Health & Human Dignity — equip Sidi Zouine and Oudaya clinics, reduce wait times, improve primary care quality.
2. Infrastructure & Spatial Justice — break isolation of Ait Imour and Akfay villages, repair roads, expand clean water and electricity.
3. Education & Reducing School Dropouts — rehabilitate rural primary schools, provide school transport for girls.
4. Youth Empowerment & Employment — vocational training centers, support for local agricultural/service cooperatives.
Other regions covered: Mhamid & Massira (urban) — social/health services, road rehab, vocational centers.
Candidate also has a personal interest in chess, theater, and believes in proximity politics (close to citizens).
`;

// ---- Public chatbot ----
app.post('/api/chat', async (req, res) => {
  try {
    const { message, language, sessionId } = req.body;

    if (!message || typeof message !== 'string' || !message.trim()) {
      return res.status(400).json({ error: 'Message is required.' });
    }
    if (message.length > 1000) {
      return res.status(400).json({ error: 'Message too long.' });
    }

    const lang = normalizeLanguage(language);
    const systemPrompt = `${SYSTEM_PROMPTS[lang]}\n\nContext you can rely on:\n${CAMPAIGN_CONTEXT}`;

    if (!GROQ_API_KEY) {
      return res.status(500).json({ error: 'Server not configured.' });
    }

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: 400,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: message.trim() },
        ],
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('Groq API error:', response.status, errText);
      return res.status(502).json({ error: 'Upstream API error.' });
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || '';

    // Persist the completed interaction without exposing database errors to the visitor.
    if (pool) {
      try {
        const conversationResult = await pool.query(
          `INSERT INTO chat_conversations (session_id, language)
           VALUES ($1, $2) RETURNING id`,
          [typeof sessionId === 'string' ? sessionId.slice(0, 128) : null, lang]
        );
        const conversationId = conversationResult.rows[0].id;
        await pool.query(
          `INSERT INTO chat_messages (conversation_id, role, content)
           VALUES ($1, 'user', $2), ($1, 'assistant', $3)`,
          [conversationId, message.trim(), reply]
        );
      } catch (dbError) {
        console.error('Failed to save chat:', dbError);
      }
    }

    return res.json({ reply });
  } catch (err) {
    console.error('Chat endpoint error:', err);
    return res.status(500).json({ error: 'Internal server error.' });
  }
});

// ---- Public problem / grievance submission ----
app.post('/api/problems', async (req, res) => {
  try {
    const { name, commune, description, language } = req.body;
    if (!pool) return res.status(503).json({ error: 'Database is not configured.' });

    const cleanName = typeof name === 'string' ? name.trim() : '';
    const cleanCommune = typeof commune === 'string' ? commune.trim() : '';
    const cleanDescription = typeof description === 'string' ? description.trim() : '';

    if (!cleanName || !cleanCommune || !cleanDescription) {
      return res.status(400).json({ error: 'Name, commune and description are required.' });
    }
    if (cleanName.length > 200 || cleanCommune.length > 200 || cleanDescription.length > 5000) {
      return res.status(400).json({ error: 'Submitted information is too long.' });
    }

    const result = await pool.query(
      `INSERT INTO problem_reports (name, commune, description, language)
       VALUES ($1, $2, $3, $4) RETURNING id, created_at`,
      [cleanName, cleanCommune, cleanDescription, normalizeLanguage(language)]
    );

    return res.status(201).json({ success: true, id: result.rows[0].id, createdAt: result.rows[0].created_at });
  } catch (err) {
    console.error('Problem submission error:', err);
    return res.status(500).json({ error: 'Unable to save the problem.' });
  }
});

// ---- Admin authentication ----
app.post('/api/admin/login', (req, res) => {
  const { username, password } = req.body || {};
  if (!ADMIN_USERNAME || !ADMIN_PASSWORD || !SESSION_SECRET) {
    return res.status(503).json({ error: 'Admin authentication is not configured.' });
  }
  if (!safeEqual(username, ADMIN_USERNAME) || !safeEqual(password, ADMIN_PASSWORD)) {
    return res.status(401).json({ error: 'Invalid username or password.' });
  }

  res.setHeader(
    'Set-Cookie',
    `admin_session=${encodeURIComponent(`${ADMIN_USERNAME}.${makeAdminToken()}`)}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=28800`
  );
  return res.json({ success: true });
});

app.post('/api/admin/logout', requireAdmin, (req, res) => {
  res.setHeader(
    'Set-Cookie',
    'admin_session=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0'
  );
  return res.json({ success: true });
});

app.get('/api/admin/me', requireAdmin, (req, res) => {
  res.json({ authenticated: true, username: ADMIN_USERNAME });
});

app.get('/api/admin/stats', requireAdmin, async (req, res) => {
  try {
    if (!pool) return res.status(503).json({ error: 'Database is not configured.' });
    const result = await pool.query(`
      SELECT
        (SELECT COUNT(*) FROM chat_conversations) AS conversations,
        (SELECT COUNT(*) FROM chat_messages) AS messages,
        (SELECT COUNT(*) FROM problem_reports) AS problems,
        (SELECT COUNT(*) FROM problem_reports WHERE status = 'new') AS new_problems,
        (SELECT COUNT(*) FROM chat_conversations WHERE created_at >= CURRENT_DATE) AS today_conversations,
        (SELECT COUNT(*) FROM problem_reports WHERE created_at >= CURRENT_DATE) AS today_problems
    `);
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Admin stats error:', err);
    res.status(500).json({ error: 'Unable to load stats.' });
  }
});

app.get('/api/admin/conversations', requireAdmin, async (req, res) => {
  try {
    if (!pool) return res.status(503).json({ error: 'Database is not configured.' });
    const result = await pool.query(`
      SELECT
        c.id,
        c.language,
        c.session_id,
        c.created_at,
        c.updated_at,
        COUNT(m.id)::int AS message_count,
        COALESCE((
          SELECT content FROM chat_messages
          WHERE conversation_id = c.id AND role = 'user'
          ORDER BY id ASC LIMIT 1
        ), '') AS first_message
      FROM chat_conversations c
      LEFT JOIN chat_messages m ON m.conversation_id = c.id
      GROUP BY c.id
      ORDER BY c.created_at DESC
      LIMIT 200
    `);
    res.json(result.rows);
  } catch (err) {
    console.error('Admin conversations error:', err);
    res.status(500).json({ error: 'Unable to load conversations.' });
  }
});

app.get('/api/admin/conversations/:id', requireAdmin, async (req, res) => {
  try {
    if (!pool) return res.status(503).json({ error: 'Database is not configured.' });
    const conversation = await pool.query(
      `SELECT id, language, session_id, created_at, updated_at
       FROM chat_conversations WHERE id = $1`,
      [req.params.id]
    );
    if (!conversation.rowCount) return res.status(404).json({ error: 'Conversation not found.' });

    const messages = await pool.query(
      `SELECT id, role, content, created_at
       FROM chat_messages WHERE conversation_id = $1 ORDER BY id ASC`,
      [req.params.id]
    );
    res.json({ conversation: conversation.rows[0], messages: messages.rows });
  } catch (err) {
    console.error('Admin conversation detail error:', err);
    res.status(500).json({ error: 'Unable to load conversation.' });
  }
});

app.get('/api/admin/problems', requireAdmin, async (req, res) => {
  try {
    if (!pool) return res.status(503).json({ error: 'Database is not configured.' });
    const result = await pool.query(`
      SELECT id, name, commune, description, language, status, created_at, updated_at
      FROM problem_reports
      ORDER BY created_at DESC
      LIMIT 500
    `);
    res.json(result.rows);
  } catch (err) {
    console.error('Admin problems error:', err);
    res.status(500).json({ error: 'Unable to load problems.' });
  }
});

app.patch('/api/admin/problems/:id', requireAdmin, async (req, res) => {
  try {
    if (!pool) return res.status(503).json({ error: 'Database is not configured.' });
    const status = ['new', 'in_progress', 'resolved'].includes(req.body?.status)
      ? req.body.status
      : null;
    if (!status) return res.status(400).json({ error: 'Invalid status.' });

    const result = await pool.query(
      `UPDATE problem_reports SET status = $1, updated_at = NOW()
       WHERE id = $2 RETURNING id, status, updated_at`,
      [status, req.params.id]
    );
    if (!result.rowCount) return res.status(404).json({ error: 'Problem not found.' });
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Admin problem update error:', err);
    res.status(500).json({ error: 'Unable to update problem.' });
  }
});

app.delete('/api/admin/problems/:id', requireAdmin, async (req, res) => {
  try {
    if (!pool) return res.status(503).json({ error: 'Database is not configured.' });
    const result = await pool.query('DELETE FROM problem_reports WHERE id = $1 RETURNING id', [req.params.id]);
    if (!result.rowCount) return res.status(404).json({ error: 'Problem not found.' });
    res.json({ success: true });
  } catch (err) {
    console.error('Admin problem delete error:', err);
    res.status(500).json({ error: 'Unable to delete problem.' });
  }
});

app.delete('/api/admin/conversations/:id', requireAdmin, async (req, res) => {
  try {
    if (!pool) return res.status(503).json({ error: 'Database is not configured.' });
    const result = await pool.query('DELETE FROM chat_conversations WHERE id = $1 RETURNING id', [req.params.id]);
    if (!result.rowCount) return res.status(404).json({ error: 'Conversation not found.' });
    res.json({ success: true });
  } catch (err) {
    console.error('Admin conversation delete error:', err);
    res.status(500).json({ error: 'Unable to delete conversation.' });
  }
});

app.get('/health', async (req, res) => {
  if (!pool) return res.json({ status: 'ok', database: 'not-configured' });
  try {
    await pool.query('SELECT 1');
    res.json({ status: 'ok', database: 'ok' });
  } catch (err) {
    res.status(503).json({ status: 'ok', database: 'error' });
  }
});

const PORT = process.env.PORT || 3001;

initDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`BaramijX chatbot backend running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Database initialization failed:', err);
    process.exit(1);
  });
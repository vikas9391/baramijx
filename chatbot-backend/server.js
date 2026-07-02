require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());

// ---- CORS ----
// Add your deployed static site URL(s) here, comma-separated, via env var.
// Example: FRONTEND_ORIGINS=https://baramijx.onrender.com,http://localhost:5173
const allowedOrigins = (process.env.FRONTEND_ORIGINS || '')
  .split(',')
  .map((o) => o.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow no-origin requests (curl, server-to-server health checks)
      if (!origin) return callback(null, true);
      if (allowedOrigins.length === 0 || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error('Not allowed by CORS'));
    },
  })
);

const GROQ_API_KEY = process.env.GROQ_API_KEY;
const MODEL = process.env.GROQ_MODEL || 'llama-3.3-70b-versatile';

// ---- System prompt: scopes the assistant strictly to the campaign ----
const SYSTEM_PROMPTS = {
  ar: `أنت المستشار الرقمي الرسمي لحملة المهندس عبد المنعم الزويني، مرشح حزب PML (الحزب الليبرالي المغربي) بدائرة مراكش المنارة.
تجاوب حصرياً على الأسئلة المتعلقة بـ:
- برنامج المرشح الانتخابي (الصحة، البنية التحتية، التعليم، تشغيل الشباب)
- سيرة المهندس عبد المنعم الزويني ورؤيته السياسية
- قضايا دائرة مراكش المنارة (سيدي الزوين، الاوداية، ايت ايمور، اكفاي، المحاميد، المسيرة، السعادة...)
- حزب PML ومبادئه

إذا كان السؤال خارج هذا النطاق (مواضيع عامة، سياسة دولية، مرشحين آخرين، أسئلة تقنية غير متعلقة، إلخ)، اعتذر بأدب وأوضح أنك مخصص فقط لأسئلة تخص حملة المهندس عبد المنعم الزويني وبرنامجه، ووجّه المستخدم لطرح سؤال متعلق بالحملة.
كن دقيقاً، محترماً، ومقتضباً (3-5 جمل كحد أقصى ما لم يُطلب تفصيل أكثر). لا تخترع وعوداً أو أرقاماً غير مذكورة في السياق.`,

  fr: `Vous êtes le conseiller numérique officiel de la campagne de l'ingénieur Abdelmounaim Zouini, candidat du parti PML (Parti Marocain Libéral) dans la circonscription de Marrakech-Menara.
Répondez EXCLUSIVEMENT aux questions concernant :
- Le programme électoral du candidat (santé, infrastructure, éducation, emploi des jeunes)
- Le parcours et la vision politique d'Abdelmounaim Zouini
- Les enjeux locaux de Marrakech-Menara (Sidi Zouine, Oudaïa, Aït Imour, Akfay, Mhamid, Massira, Saada...)
- Le parti PML et ses principes

Si la question sort de ce cadre (sujets généraux, politique internationale, autres candidats, questions techniques non liées, etc.), déclinez poliment en précisant que vous êtes dédié uniquement aux questions sur la campagne d'Abdelmounaim Zouini et son programme, et invitez l'utilisateur à poser une question liée à la campagne.
Soyez précis, respectueux et concis (3-5 phrases maximum sauf si plus de détail est demandé). N'inventez jamais de promesses ou chiffres non mentionnés dans le contexte.`,

  en: `You are the official digital advisor for the campaign of Engineer Abdelmounaim Zouini, PML party (Moroccan Liberal Party) candidate for the Marrakech-Menara district.
Answer EXCLUSIVELY questions about:
- The candidate's electoral program (healthcare, infrastructure, education, youth employment)
- Abdelmounaim Zouini's background and political vision
- Local issues in Marrakech-Menara (Sidi Zouine, Oudaya, Ait Imour, Akfay, Mhamid, Massira, Saada...)
- The PML party and its principles

If a question falls outside this scope (general topics, international politics, other candidates, unrelated technical questions, etc.), politely decline, explain that you are dedicated only to questions about Abdelmounaim Zouini's campaign and program, and invite the user to ask a campaign-related question.
Be accurate, respectful, and concise (3-5 sentences max unless more detail is requested). Never invent promises or figures not present in the context.`,
};

// Grounding context injected into every request so answers stay factual.
const CAMPAIGN_CONTEXT = `
Candidate: Engineer Abdelmounaim Zouini, PML (Parti Marocain Libéral / الحزب الليبرالي المغربي), Marrakech-Menara district.
Program pillars:
1. Health & Human Dignity — equip Sidi Zouine and Oudaya clinics, reduce wait times, improve primary care quality.
2. Infrastructure & Spatial Justice — break isolation of Ait Imour and Akfay villages, repair roads, expand clean water and electricity.
3. Education & Reducing School Dropouts — rehabilitate rural primary schools, provide school transport for girls.
4. Youth Empowerment & Employment — vocational training centers, support for local agricultural/service cooperatives.
Other regions covered: Mhamid & Massira (urban) — social/health services, road rehab, vocational centers.
Candidate also has a personal interest in chess, theater, and believes in proximity politics (close to citizens).
`;

app.post('/api/chat', async (req, res) => {
  try {
    const { message, language } = req.body;

    if (!message || typeof message !== 'string' || !message.trim()) {
      return res.status(400).json({ error: 'Message is required.' });
    }
    if (message.length > 1000) {
      return res.status(400).json({ error: 'Message too long.' });
    }

    const lang = ['ar', 'fr', 'en'].includes(language) ? language : 'en';
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

    return res.json({ reply });
  } catch (err) {
    console.error('Chat endpoint error:', err);
    return res.status(500).json({ error: 'Internal server error.' });
  }
});

app.get('/health', (req, res) => res.json({ status: 'ok' }));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`BaramijX chatbot backend running on port ${PORT}`);
});
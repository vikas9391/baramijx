require('dotenv').config();
const express = require('express');
const crypto = require('crypto');
const { Pool } = require('pg');
const { spawn } = require('child_process');
const path = require('path');

const app = express();
const PORT = Number(process.env.PORT || 3001);
const INTERNAL_PORT = PORT + 1;
const DATABASE_URL = process.env.DATABASE_URL;
const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const SESSION_SECRET = process.env.SESSION_SECRET;
const allowedOrigins = (process.env.FRONTEND_ORIGINS || '').split(',').map((o) => o.trim()).filter(Boolean);

const pool = DATABASE_URL
  ? new Pool({ connectionString: DATABASE_URL, ssl: { rejectUnauthorized: false }, max: 5 })
  : null;

function safeEqual(a, b) {
  if (!a || !b) return false;
  const aa = Buffer.from(String(a));
  const bb = Buffer.from(String(b));
  return aa.length === bb.length && crypto.timingSafeEqual(aa, bb);
}
function makeAdminToken() { return crypto.createHmac('sha256', SESSION_SECRET || '').update(String(ADMIN_USERNAME || '')).digest('hex'); }
function parseCookies(header) { const cookies = {}; for (const part of (header || '').split(';')) { const [key, ...value] = part.trim().split('='); if (key) cookies[key] = decodeURIComponent(value.join('=')); } return cookies; }
function isAdminAuthenticated(req) { if (!ADMIN_USERNAME || !ADMIN_PASSWORD || !SESSION_SECRET) return false; const cookies = parseCookies(req.headers.cookie); const [username, signature] = (cookies.admin_session || '').split('.'); return username === ADMIN_USERNAME && safeEqual(signature, makeAdminToken()); }
function requireAdmin(req, res, next) { if (!isAdminAuthenticated(req)) return res.status(401).json({ error: 'Unauthorized.' }); next(); }

async function initVisitorTable() {
  if (!pool) { console.warn('DATABASE_URL is not configured; visitor counter is disabled.'); return; }
  await pool.query(`
    CREATE TABLE IF NOT EXISTS visitor_counter (
      id INTEGER PRIMARY KEY CHECK (id = 1),
      actual_visits BIGINT NOT NULL DEFAULT 0,
      display_offset BIGINT NOT NULL DEFAULT 0,
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
    INSERT INTO visitor_counter (id, actual_visits, display_offset)
    VALUES (1, 0, 0)
    ON CONFLICT (id) DO NOTHING;
  `);
}

app.use(express.json({ limit: '2mb' }));
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (!origin || allowedOrigins.length === 0 || allowedOrigins.includes(origin)) {
    if (origin) res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Vary', 'Origin');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE,OPTIONS');
    if (req.method === 'OPTIONS') return res.sendStatus(204);
  }
  next();
});

app.post('/api/visitor/visit', async (req, res) => {
  try {
    if (!pool) return res.status(503).json({ error: 'Database is not configured.' });
    const result = await pool.query(`UPDATE visitor_counter SET actual_visits = actual_visits + 1, updated_at = NOW() WHERE id = 1 RETURNING actual_visits, actual_visits + display_offset AS displayed_visits`);
    res.json({ visits: result.rows[0].displayed_visits });
  } catch (err) { console.error('Visitor counter error:', err); res.status(500).json({ error: 'Unable to update visitor counter.' }); }
});

app.get('/api/visitor/count', async (req, res) => {
  try {
    if (!pool) return res.status(503).json({ error: 'Database is not configured.' });
    const result = await pool.query(`SELECT actual_visits, actual_visits + display_offset AS displayed_visits FROM visitor_counter WHERE id = 1`);
    res.json({ visits: result.rows[0]?.displayed_visits ?? 0 });
  } catch (err) { console.error('Visitor count error:', err); res.status(500).json({ error: 'Unable to load visitor counter.' }); }
});

app.get('/api/admin/visitors', requireAdmin, async (req, res) => {
  try {
    if (!pool) return res.status(503).json({ error: 'Database is not configured.' });
    const result = await pool.query(`SELECT actual_visits, display_offset, actual_visits + display_offset AS displayed_visits, updated_at FROM visitor_counter WHERE id = 1`);
    res.json(result.rows[0]);
  } catch (err) { console.error('Admin visitor counter error:', err); res.status(500).json({ error: 'Unable to load visitor counter.' }); }
});

app.patch('/api/admin/visitors', requireAdmin, async (req, res) => {
  try {
    if (!pool) return res.status(503).json({ error: 'Database is not configured.' });
    const desired = Number(req.body?.displayed_visits);
    if (!Number.isSafeInteger(desired) || desired < 0) return res.status(400).json({ error: 'Displayed visitor count must be a non-negative whole number.' });
    const result = await pool.query(`UPDATE visitor_counter SET display_offset = $1 - actual_visits, updated_at = NOW() WHERE id = 1 RETURNING actual_visits, display_offset, actual_visits + display_offset AS displayed_visits, updated_at`, [desired]);
    res.json(result.rows[0]);
  } catch (err) { console.error('Admin visitor counter update error:', err); res.status(500).json({ error: 'Unable to update visitor counter.' }); }
});

// Proxy all existing campaign API routes to the original backend, keeping its current behavior intact.
app.use(async (req, res) => {
  try {
    const headers = { ...req.headers };
    delete headers.host;
    delete headers['content-length'];
    const body = ['GET', 'HEAD'].includes(req.method) ? undefined : JSON.stringify(req.body ?? {});
    const response = await fetch(`http://127.0.0.1:${INTERNAL_PORT}${req.originalUrl}`, { method: req.method, headers, body });
    res.status(response.status);
    response.headers.forEach((value, key) => res.setHeader(key, value));
    res.send(Buffer.from(await response.arrayBuffer()));
  } catch (err) { console.error('Backend proxy error:', err); res.status(502).json({ error: 'Backend service unavailable.' }); }
});

async function start() {
  await initVisitorTable();
  const child = spawn(process.execPath, [path.join(__dirname, 'server.js')], { env: { ...process.env, PORT: String(INTERNAL_PORT) }, stdio: 'inherit' });
  child.on('exit', (code) => process.exit(code ?? 1));
  app.listen(PORT, () => console.log(`BaramijX visitor gateway running on port ${PORT}`));
}
start().catch((err) => { console.error('Visitor gateway startup failed:', err); process.exit(1); });

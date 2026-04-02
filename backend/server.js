/**
 * Alsat API - Node.js + Express
 * Güvenlik, logging, validation, pagination, audit
 */
require('dotenv').config();
const express = require('express');
const fs = require('fs');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
const config = require('./config');
const db = require('./db');
const { sendVerificationCode } = require('./mail');
const { logger, requestLogger } = require('./logger');
const { audit, getAuditLog } = require('./audit');
const { errorHandler, notFound } = require('./middleware/errorHandler');
const {
  createToken, createRefreshToken, refreshAccessToken,
  jwtMiddleware, hashPassword, comparePassword, rateLimit,
  checkLoginLockout, recordLoginFailure, recordLoginSuccess
} = require('./security');
const {
  handleValidation, loginRules, registerRules, changePasswordRules,
  createAdRules, updateAdRules, reportAdRules, paginationRules
} = require('./validation');

// Doğrulama kodları (e-posta -> { code, expires, type })
const verificationCodes = new Map();
const CODE_TTL = 10 * 60 * 1000; // 10 dakika

function generateCode() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

function setCode(email, type) {
  const code = generateCode();
  verificationCodes.set(email.toLowerCase(), { code, expires: Date.now() + CODE_TTL, type });
  return code;
}

function verifyCode(email, code, type) {
  const entry = verificationCodes.get(email.toLowerCase());
  if (!entry || entry.code !== String(code) || entry.type !== type || Date.now() > entry.expires) return false;
  verificationCodes.delete(email.toLowerCase());
  return true;
}

const app = express();
const driver = config.db.driver;
const isSqlite = driver === 'sqlite';

// Online kullanıcı takibi (in-memory, son 5 dk aktivite)
const activeSessions = new Map();
const ONLINE_TTL_MS = 5 * 60 * 1000;
function getClientIp(req) {
  return req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.headers['x-real-ip'] || req.ip || req.connection?.remoteAddress || 'unknown';
}
function upsertActiveSession(req, userId) {
  const ip = getClientIp(req);
  const ua = (req.headers['user-agent'] || '').slice(0, 500);
  const key = ip + '|' + (ua ? ua.slice(-50) : '');
  activeSessions.set(key, { ip, userAgent: ua, userId: userId || null, lastActivity: Date.now() });
}
function getOnlineUsers() {
  const now = Date.now();
  const out = [];
  for (const [k, v] of activeSessions) {
    if (now - v.lastActivity < ONLINE_TTL_MS) out.push({ ...v, sessionKey: k });
  }
  for (const [k, v] of activeSessions) {
    if (now - v.lastActivity >= ONLINE_TTL_MS) activeSessions.delete(k);
  }
  return out.sort((a, b) => b.lastActivity - a.lastActivity);
}

// Nginx vb. arkasında çalışırken doğru IP/protocol için
app.set('trust proxy', 1);

// Middleware
app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors({
  origin: config.cors.allowedOrigins.length ? config.cors.allowedOrigins : true
}));
app.use(express.json({ limit: '10mb' }));
app.use(rateLimit);
app.use(requestLogger);

// Her API isteğinde oturum kaydı
app.use('/api', (req, res, next) => {
  let uid = null;
  const auth = req.headers.authorization;
  if (auth && auth.startsWith('Bearer ')) {
    try {
      const jwt = require('jsonwebtoken');
      const decoded = jwt.verify(auth.slice(7), config.jwt.secret);
      uid = decoded.id;
    } catch (e) {}
  }
  upsertActiveSession(req, uid);
  next();
});

// Ping endpoint - frontend periyodik çağırır (online sayım için)
app.get('/api/ping', (req, res) => {
  res.json({ ok: true, ts: Date.now() });
});

// SQLite tabloları
if (isSqlite) {
  const Database = require('better-sqlite3');
  const sqlite = new Database(path.join(__dirname, 'alsat.db'));
  sqlite.exec(`
    CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT UNIQUE, name TEXT, password_hash TEXT, phone TEXT, banned INTEGER DEFAULT 0, created_at TEXT);
    CREATE TABLE IF NOT EXISTS ads (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER, title TEXT, price REAL, currency TEXT, category TEXT, sub_category TEXT, city TEXT, district TEXT, description TEXT, images TEXT, video TEXT, attrs TEXT, condition TEXT, seller_type TEXT, status TEXT DEFAULT 'approved', views INTEGER DEFAULT 0, clicks INTEGER DEFAULT 0, fav_count INTEGER DEFAULT 0, accept_trade INTEGER DEFAULT 0, price_history TEXT, sold_at TEXT, created_at TEXT, expiry_at TEXT, featured INTEGER DEFAULT 0, urgent INTEGER DEFAULT 0, hide_phone INTEGER DEFAULT 0);
    CREATE TABLE IF NOT EXISTS favorites (user_id INTEGER, ad_id INTEGER, PRIMARY KEY(user_id, ad_id));
    CREATE TABLE IF NOT EXISTS ad_reports (id INTEGER PRIMARY KEY AUTOINCREMENT, ad_id INTEGER, user_id INTEGER, reason TEXT, created_at TEXT DEFAULT CURRENT_TIMESTAMP);
    CREATE TABLE IF NOT EXISTS search_alerts (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER, query TEXT, filters TEXT, email TEXT, active INTEGER DEFAULT 1, created_at TEXT DEFAULT CURRENT_TIMESTAMP);
    CREATE TABLE IF NOT EXISTS conversations (id INTEGER PRIMARY KEY AUTOINCREMENT, ad_id INTEGER, seller_id INTEGER, buyer_id INTEGER, seller_confirmed INTEGER DEFAULT 0, buyer_confirmed INTEGER DEFAULT 0, rated INTEGER DEFAULT 0, last_msg_time INTEGER, created_at TEXT DEFAULT CURRENT_TIMESTAMP);
    CREATE TABLE IF NOT EXISTS messages (id INTEGER PRIMARY KEY AUTOINCREMENT, conversation_id INTEGER, from_user_id INTEGER, text TEXT, time INTEGER);
    CREATE TABLE IF NOT EXISTS price_alerts (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER, ad_id INTEGER, price_at_subscribe REAL, ad_title TEXT, notified INTEGER DEFAULT 0, created_at TEXT, UNIQUE(user_id, ad_id));
    CREATE TABLE IF NOT EXISTS ad_drafts (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER, data TEXT, updated_at TEXT);
    CREATE TABLE IF NOT EXISTS user_ratings (id INTEGER PRIMARY KEY AUTOINCREMENT, from_user_id INTEGER, to_user_id INTEGER, ad_id INTEGER, conversation_id INTEGER, rating INTEGER, comment TEXT, created_at TEXT);
    CREATE TABLE IF NOT EXISTS popular_searches (id INTEGER PRIMARY KEY AUTOINCREMENT, query TEXT, hit_count INTEGER DEFAULT 1, updated_at TEXT);
    CREATE TABLE IF NOT EXISTS phone_views (id INTEGER PRIMARY KEY AUTOINCREMENT, ad_id INTEGER, user_id INTEGER, viewed_at TEXT);
    CREATE TABLE IF NOT EXISTS active_sessions (id INTEGER PRIMARY KEY AUTOINCREMENT, session_key TEXT UNIQUE, user_id INTEGER, ip TEXT, user_agent TEXT, last_activity TEXT);
  `);
    try { sqlite.exec('ALTER TABLE ads ADD COLUMN hide_phone INTEGER DEFAULT 0'); } catch (e) {}
    try { sqlite.exec('ALTER TABLE messages ADD COLUMN read_at INTEGER'); } catch (e) {}
    try { sqlite.exec('CREATE TABLE IF NOT EXISTS web_push_subscriptions (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER, endpoint TEXT, p256dh TEXT, auth TEXT, user_agent TEXT, created_at TEXT DEFAULT CURRENT_TIMESTAMP)'); } catch (e) {}
}

function paramStyle(sql, params) {
  if (!params || params.length === 0) return { sql, params };
  if (driver === 'postgres') {
    let i = 0;
    return { sql: sql.replace(/\?/g, () => '$' + (++i)), params };
  }
  return { sql, params };
}
function insertReturningId(sql, params) {
  const result = paramStyle(sql, params);
  if (driver === 'postgres' && /^\s*INSERT\s+INTO/i.test(sql)) {
    result.sql = result.sql + ' RETURNING id';
  }
  return result;
}

function parseAdRow(r) {
  const o = { ...r };
  if (typeof o.images === 'string') o.images = o.images ? JSON.parse(o.images) : [];
  if (typeof o.attrs === 'string') o.attrs = o.attrs ? JSON.parse(o.attrs) : null;
  if (typeof o.price_history === 'string') o.priceHistory = o.price_history ? JSON.parse(o.price_history) : null;
  return o;
}

// ========== İLANLAR (Pagination - page/limit yoksa eski format) ==========
app.get('/api/ads', paginationRules, handleValidation, async (req, res, next) => {
  try {
    const { category, city, minPrice, maxPrice, search, page, limit } = req.query;
    const usePagination = page !== undefined || limit !== undefined;
    const pageNum = usePagination ? (parseInt(page, 10) || 1) : 1;
    const limitNum = usePagination ? Math.min(parseInt(limit, 10) || 20, 100) : 200;
    const offset = (pageNum - 1) * limitNum;

    let sql = 'SELECT * FROM ads WHERE status = ?';
    const params = ['approved'];
    if (category && category !== 'all') { sql += ' AND (category = ? OR sub_category = ?)'; params.push(category, category); }
    if (city) { sql += ' AND city = ?'; params.push(city); }
    if (minPrice) { sql += ' AND price >= ?'; params.push(parseFloat(minPrice)); }
    if (maxPrice) { sql += ' AND price <= ?'; params.push(parseFloat(maxPrice)); }
    if (search) { sql += ' AND (title LIKE ? OR description LIKE ?)'; params.push('%' + search + '%', '%' + search + '%'); }

    let total = 0;
    if (usePagination) {
      const countSql = sql.replace('SELECT *', 'SELECT COUNT(*) as total');
      const { sql: countS, params: countP } = paramStyle(countSql, params);
      const countRes = await db.queryAsync(countS, countP);
      total = (countRes && countRes[0] && (countRes[0].total ?? countRes[0]['COUNT(*)'])) || 0;
    }

    sql += ' ORDER BY id DESC LIMIT ? OFFSET ?';
    params.push(limitNum, offset);
    const { sql: s, params: p } = paramStyle(sql, params);
    const rows = await db.queryAsync(s, p);
    const items = rows.map(parseAdRow);

    if (usePagination) {
      res.json({ items, total, page: pageNum, limit: limitNum, pages: Math.ceil(total / limitNum) || 1 });
    } else {
      res.json(items);
    }
  } catch (e) {
    next(e);
  }
});

app.get('/api/ads/:id', async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    const { sql: s, params: p } = paramStyle('SELECT * FROM ads WHERE id = ?', [id]);
    const row = await db.getAsync(s, p);
    if (!row) return res.status(404).json({ error: 'İlan bulunamadı' });
    const r = parseAdRow(row);
    const { sql: u, params: up } = paramStyle('UPDATE ads SET views = COALESCE(views, 0) + 1 WHERE id = ?', [id]);
    await db.runAsync(u, up);
    r.views = (r.views || 0) + 1;
    res.json(r);
  } catch (e) {
    next(e);
  }
});

app.post('/api/ads', jwtMiddleware, createAdRules, handleValidation, async (req, res, next) => {
  try {
    const d = req.body;
    const userId = req.user.id;
    const images = JSON.stringify(d.images || []);
    const attrs = JSON.stringify(d.attrs || {});
    const priceHistory = JSON.stringify(d.priceHistory || [{ price: d.price, currency: d.currency || 'MKD', date: new Date().toISOString() }]);
    const createdAt = new Date().toISOString().slice(0, 10);
    const expiry = new Date();
    expiry.setDate(expiry.getDate() + (d.durationDays || 30));
    const expiryAt = expiry.toISOString().slice(0, 10);
    const insertCols = 'user_id, title, price, currency, category, sub_category, city, district, description, images, attrs, condition, seller_type, status, accept_trade, price_history, created_at, expiry_at';
    const insertVals = '?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?';
    const insertParams = [userId, d.title, d.price, d.currency || 'MKD', d.category, d.subCategory || '', d.city, d.district || '', d.description || '', images, attrs, d.condition || 'İkinci El', d.sellerType || 'Sahibinden', d.status || 'pending', d.acceptTrade ? 1 : 0, priceHistory, createdAt, expiryAt];
    let insertSql = `INSERT INTO ads (${insertCols}) VALUES (${insertVals})`;
    if (driver === 'postgres') insertSql += ' RETURNING id';
    const { sql: s, params: p } = paramStyle(insertSql, insertParams);
    const r = await db.runAsync(s, p);
    audit('ad_created', { userId, adId: r.insertId ?? r.insert_id, title: d.title });
    res.status(201).json({ id: r.insertId ?? r.insert_id });
  } catch (e) {
    next(e);
  }
});

// İlan güncelleme
app.put('/api/ads/:id', jwtMiddleware, updateAdRules, handleValidation, async (req, res, next) => {
  try {
    const adId = parseInt(req.params.id, 10);
    const userId = req.user.id;
    const { sql: s, params: p } = paramStyle('SELECT id, user_id FROM ads WHERE id = ?', [adId]);
    const row = await db.getAsync(s, p);
    if (!row) return res.status(404).json({ error: 'İlan bulunamadı' });
    if (row.user_id !== userId) return res.status(403).json({ error: 'Yetkisiz' });
    const d = req.body;
    const updates = [];
    const params = [];
    if (d.title !== undefined) { updates.push('title = ?'); params.push(d.title); }
    if (d.price !== undefined) { updates.push('price = ?'); params.push(d.price); }
    if (d.currency !== undefined) { updates.push('currency = ?'); params.push(d.currency); }
    if (d.category !== undefined) { updates.push('category = ?'); params.push(d.category); }
    if (d.subCategory !== undefined) { updates.push('sub_category = ?'); params.push(d.subCategory); }
    if (d.city !== undefined) { updates.push('city = ?'); params.push(d.city); }
    if (d.district !== undefined) { updates.push('district = ?'); params.push(d.district); }
    if (d.description !== undefined) { updates.push('description = ?'); params.push(d.description); }
    if (d.images !== undefined) { updates.push('images = ?'); params.push(JSON.stringify(d.images)); }
    if (d.attrs !== undefined) { updates.push('attrs = ?'); params.push(JSON.stringify(d.attrs || {})); }
    if (d.condition !== undefined) { updates.push('condition = ?'); params.push(d.condition); }
    if (d.sellerType !== undefined) { updates.push('seller_type = ?'); params.push(d.sellerType); }
    if (d.status !== undefined) { updates.push('status = ?'); params.push(d.status); }
    if (d.hidePhone !== undefined) { updates.push('hide_phone = ?'); params.push(d.hidePhone ? 1 : 0); }
    if (updates.length === 0) return res.status(400).json({ error: 'Güncellenecek alan yok' });
    params.push(adId);
    const { sql: u, params: up } = paramStyle('UPDATE ads SET ' + updates.join(', ') + ' WHERE id = ?', params);
    await db.runAsync(u, up);
    audit('ad_updated', { userId, adId });
    res.json({ ok: true });
  } catch (e) {
    next(e);
  }
});

// İlan silme
app.delete('/api/ads/:id', jwtMiddleware, async (req, res, next) => {
  try {
    const adId = parseInt(req.params.id, 10);
    const userId = req.user.id;
    const { sql: s, params: p } = paramStyle('SELECT id, user_id FROM ads WHERE id = ?', [adId]);
    const row = await db.getAsync(s, p);
    if (!row) return res.status(404).json({ error: 'İlan bulunamadı' });
    if (row.user_id !== userId) return res.status(403).json({ error: 'Yetkisiz' });
    const { sql: d1, params: p1 } = paramStyle('DELETE FROM favorites WHERE ad_id = ?', [adId]);
    await db.runAsync(d1, p1);
    const { sql: d2, params: p2 } = paramStyle('DELETE FROM ads WHERE id = ?', [adId]);
    await db.runAsync(d2, p2);
    audit('ad_deleted', { userId, adId });
    res.json({ ok: true });
  } catch (e) {
    next(e);
  }
});

// İlan raporlama
app.post('/api/ads/:id/report', jwtMiddleware, reportAdRules, handleValidation, async (req, res, next) => {
  try {
    const adId = parseInt(req.params.id, 10);
    const userId = req.user.id;
    const reason = (req.body.reason || '').slice(0, 200);
    const { sql: s, params: p } = paramStyle('INSERT INTO ad_reports (ad_id, user_id, reason) VALUES (?, ?, ?)', [adId, userId, reason]);
    await db.runAsync(s, p);
    audit('ad_reported', { adId, userId, reason });
    res.json({ ok: true });
  } catch (e) {
    next(e);
  }
});

app.get('/api/ads-full', async (req, res, next) => {
  try {
    const rows = await db.queryAsync('SELECT * FROM ads ORDER BY id DESC LIMIT 500');
    res.json(rows.map(parseAdRow));
  } catch (e) {
    next(e);
  }
});

// ========== KULLANICILAR ==========
app.get('/api/users', async (req, res, next) => {
  try {
    const rows = await db.queryAsync('SELECT id, email, name, phone, banned, created_at FROM users');
    const obj = {};
    rows.forEach(r => { obj[r.id] = r; });
    res.json(obj);
  } catch (e) {
    next(e);
  }
});

app.get('/api/users/:id', async (req, res, next) => {
  try {
    const { sql: s, params: p } = paramStyle('SELECT id, email, name, phone, banned, created_at FROM users WHERE id = ?', [parseInt(req.params.id)]);
    const row = await db.getAsync(s, p);
    if (!row) return res.status(404).json({ error: 'Kullanıcı bulunamadı' });
    res.json(row);
  } catch (e) {
    next(e);
  }
});

// ========== AUTH ==========
app.post('/api/auth/register', registerRules, handleValidation, async (req, res, next) => {
  try {
    const { email, name, password } = req.body;
    const hash = hashPassword(password);
    const { sql: s, params: p } = insertReturningId('INSERT INTO users (email, name, password_hash) VALUES (?, ?, ?)', [email, name || 'Kullanıcı', hash]);
    const r = await db.runAsync(s, p);
    res.status(201).json({ id: r.insertId ?? r.insert_id });
  } catch (e) {
    next(e);
  }
});

app.post('/api/auth/send-code', async (req, res, next) => {
  try {
    const { type, email } = req.body;
    const em = (email || '').trim().toLowerCase();
    if (!em || !['register', 'forgot'].includes(type)) {
      return res.status(400).json({ error: 'Geçersiz istek' });
    }
    if (type === 'forgot') {
      const { sql: s, params: p } = paramStyle('SELECT id FROM users WHERE LOWER(TRIM(email)) = ?', [em]);
      const row = await db.getAsync(s, p);
      if (!row) return res.status(404).json({ error: 'Bu e-posta adresi kayıtlı değil' });
    } else {
      const { sql: s, params: p } = paramStyle('SELECT id FROM users WHERE LOWER(TRIM(email)) = ?', [em]);
      const row = await db.getAsync(s, p);
      if (row) return res.status(400).json({ error: 'Bu e-posta adresi zaten kayıtlı' });
    }
    const code = setCode(em, type);
    await sendVerificationCode(em, code, type);
    res.json({ ok: true });
  } catch (e) {
    next(e);
  }
});

app.post('/api/auth/verify-register', async (req, res, next) => {
  try {
    const { email, code, name, password, phone } = req.body;
    const em = (email || '').trim().toLowerCase();
    if (!em || !code || !password || password.length < 6) {
      return res.status(400).json({ error: 'Eksik veya geçersiz bilgi' });
    }
    if (!verifyCode(em, code, 'register')) {
      return res.status(400).json({ error: 'Geçersiz veya süresi dolmuş kod' });
    }
    const hash = hashPassword(password);
    const phoneVal = (phone || '').trim();
    const { sql: s, params: p } = insertReturningId('INSERT INTO users (email, name, password_hash, phone) VALUES (?, ?, ?, ?)', [em, (name || '').trim() || em.split('@')[0], hash, phoneVal]);
    const r = await db.runAsync(s, p);
    res.status(201).json({ id: r.insertId ?? r.insert_id });
  } catch (e) {
    next(e);
  }
});

app.post('/api/auth/verify-forgot', async (req, res, next) => {
  try {
    const { email, code, newPassword } = req.body;
    const em = (email || '').trim().toLowerCase();
    if (!em || !code || !newPassword || newPassword.length < 6) {
      return res.status(400).json({ error: 'Eksik veya geçersiz bilgi' });
    }
    if (!verifyCode(em, code, 'forgot')) {
      return res.status(400).json({ error: 'Geçersiz veya süresi dolmuş kod' });
    }
    const hash = hashPassword(newPassword);
    const { sql: s1, params: p1 } = paramStyle('SELECT id FROM users WHERE LOWER(TRIM(email)) = ?', [em]);
    const row = await db.getAsync(s1, p1);
    if (!row) return res.status(404).json({ error: 'Kullanıcı bulunamadı' });
    const { sql: s2, params: p2 } = paramStyle('UPDATE users SET password_hash = ? WHERE id = ?', [hash, row.id]);
    await db.runAsync(s2, p2);
    res.json({ ok: true });
  } catch (e) {
    next(e);
  }
});

async function verifyRecaptcha(token, expectedAction) {
  const secret = config.recaptcha?.secretKey;
  if (!secret) return true; // Backend'de reCAPTCHA yoksa geç
  if (!token) return false; // Secret var ama token yok = reddet
  try {
    const r = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ secret, response: token })
    });
    const j = await r.json();
    if (!j.success) return false;
    if (expectedAction && j.action && j.action !== expectedAction) return false;
    return (j.score !== undefined ? j.score >= 0.5 : true);
  } catch (e) {
    return false;
  }
}

app.post('/api/auth/login', loginRules, handleValidation, async (req, res, next) => {
  try {
    const ip = req.ip || req.connection?.remoteAddress || 'unknown';
    const lockMsg = checkLoginLockout(ip);
    if (lockMsg) return res.status(429).json({ error: lockMsg });

    const { email, password, recaptchaToken } = req.body;
    if (config.recaptcha?.secretKey && !(await verifyRecaptcha(recaptchaToken, 'login'))) {
      return res.status(400).json({ error: 'Güvenlik doğrulaması başarısız. Sayfayı yenileyip tekrar deneyin.' });
    }
    const em = (email || '').trim().toLowerCase();
    const { sql: s, params: p } = paramStyle('SELECT id, email, name, password_hash, banned FROM users WHERE LOWER(TRIM(email)) = ?', [em]);
    const row = await db.getAsync(s, p);
    if (!row) {
      recordLoginFailure(ip);
      return res.status(401).json({ error: 'E-posta veya şifre hatalı' });
    }
    if (row.banned) return res.status(403).json({ error: 'Hesabınız engellenmiş' });
    if (!comparePassword(password, row.password_hash)) {
      recordLoginFailure(ip);
      return res.status(401).json({ error: 'E-posta veya şifre hatalı' });
    }
    recordLoginSuccess(ip);
    const token = createToken({ id: row.id, email: row.email });
    const refreshToken = createRefreshToken({ id: row.id, email: row.email });
    const isAdmin = (row.email || '').toLowerCase() === (config.admin.email || '').toLowerCase();
    res.json({ id: row.id, email: row.email, name: row.name, token, refreshToken, isAdmin });
  } catch (e) {
    next(e);
  }
});

app.post('/api/auth/refresh', async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) return res.status(400).json({ error: 'Refresh token gerekli' });
    const token = refreshAccessToken(refreshToken);
    if (!token) return res.status(401).json({ error: 'Geçersiz veya süresi dolmuş refresh token' });
    res.json({ token });
  } catch (e) {
    next(e);
  }
});

app.get('/api/auth/me', jwtMiddleware, async (req, res, next) => {
  try {
    const { sql: s, params: p } = paramStyle('SELECT id, email, name, phone, banned FROM users WHERE id = ?', [req.user.id]);
    const row = await db.getAsync(s, p);
    if (!row) return res.status(404).json({ error: 'Kullanıcı bulunamadı' });
    if (row.banned) return res.status(403).json({ error: 'Hesabınız engellenmiş' });
    const isAdmin = (row.email || '').toLowerCase() === (config.admin.email || '').toLowerCase();
    res.json({ id: row.id, email: row.email, name: row.name, phone: row.phone, isAdmin });
  } catch (e) {
    next(e);
  }
});

app.post('/api/auth/change-password', jwtMiddleware, changePasswordRules, handleValidation, async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { currentPassword, newPassword } = req.body;
    const { sql: s, params: p } = paramStyle('SELECT password_hash FROM users WHERE id = ?', [userId]);
    const row = await db.getAsync(s, p);
    if (!row || !comparePassword(currentPassword, row.password_hash)) {
      return res.status(401).json({ error: 'Mevcut şifre hatalı' });
    }
    const hash = hashPassword(newPassword);
    const { sql: s2, params: p2 } = paramStyle('UPDATE users SET password_hash = ? WHERE id = ?', [hash, userId]);
    await db.runAsync(s2, p2);
    audit('password_changed', { userId });
    res.json({ ok: true });
  } catch (e) {
    next(e);
  }
});

// ========== FAVORİLER ==========
app.get('/api/favorites/:userId', jwtMiddleware, async (req, res, next) => {
  try {
    const userId = req.user.id;
    if (parseInt(req.params.userId) !== userId) return res.status(403).json({ error: 'Yetkisiz' });
    const { sql: s, params: p } = paramStyle('SELECT ad_id FROM favorites WHERE user_id = ?', [userId]);
    const rows = await db.queryAsync(s, p);
    res.json(rows.map(r => r.ad_id));
  } catch (e) {
    next(e);
  }
});

app.post('/api/favorites', jwtMiddleware, async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { adId } = req.body;
    let sql = 'INSERT INTO favorites (user_id, ad_id) VALUES (?, ?)';
    if (driver === 'postgres') sql += ' ON CONFLICT (user_id, ad_id) DO NOTHING';
    else if (driver === 'mysql') sql += ' ON DUPLICATE KEY UPDATE ad_id = VALUES(ad_id)';
    else sql = 'INSERT OR REPLACE INTO favorites (user_id, ad_id) VALUES (?, ?)';
    const { sql: s, params: p } = paramStyle(sql, [userId, adId]);
    await db.runAsync(s, p);
    res.json({ ok: true });
  } catch (e) {
    next(e);
  }
});

app.delete('/api/favorites/:userId/:adId', jwtMiddleware, async (req, res, next) => {
  try {
    const userId = req.user.id;
    if (parseInt(req.params.userId) !== userId) return res.status(403).json({ error: 'Yetkisiz' });
    const { sql: s, params: p } = paramStyle('DELETE FROM favorites WHERE user_id = ? AND ad_id = ?', [userId, parseInt(req.params.adId)]);
    await db.runAsync(s, p);
    res.json({ ok: true });
  } catch (e) {
    next(e);
  }
});

// ========== FİYAT TAKİBİ (Price Alerts) ==========
app.get('/api/price-alerts', jwtMiddleware, async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { sql: s, params: p } = paramStyle('SELECT * FROM price_alerts WHERE user_id = ? AND notified = 0 ORDER BY created_at DESC', [userId]);
    const rows = await db.queryAsync(s, p);
    res.json(rows);
  } catch (e) { next(e); }
});

app.post('/api/price-alerts', jwtMiddleware, async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { adId, priceAtSubscribe, adTitle } = req.body;
    const { sql: s1, params: p1 } = paramStyle('SELECT id, price, currency FROM ads WHERE id = ?', [adId]);
    const ad = await db.getAsync(s1, p1);
    if (!ad) return res.status(404).json({ error: 'İlan bulunamadı' });
    const priceEur = priceAtSubscribe || ad.price;
    let sql = 'INSERT INTO price_alerts (user_id, ad_id, price_at_subscribe, ad_title, notified) VALUES (?, ?, ?, ?, 0)';
    if (driver === 'postgres') sql += ' ON CONFLICT (user_id, ad_id) DO UPDATE SET price_at_subscribe = EXCLUDED.price_at_subscribe, ad_title = EXCLUDED.ad_title, notified = 0';
    else if (driver === 'mysql') sql += ' ON DUPLICATE KEY UPDATE price_at_subscribe = VALUES(price_at_subscribe), ad_title = VALUES(ad_title), notified = 0';
    else sql = 'INSERT OR REPLACE INTO price_alerts (user_id, ad_id, price_at_subscribe, ad_title, notified) VALUES (?, ?, ?, ?, 0)';
    const { sql: s, params: p } = paramStyle(sql, [userId, adId, priceEur, adTitle || ad.title]);
    await db.runAsync(s, p);
    res.json({ ok: true });
  } catch (e) { next(e); }
});

app.delete('/api/price-alerts/:adId', jwtMiddleware, async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { sql: s, params: p } = paramStyle('DELETE FROM price_alerts WHERE user_id = ? AND ad_id = ?', [userId, parseInt(req.params.adId)]);
    await db.runAsync(s, p);
    res.json({ ok: true });
  } catch (e) { next(e); }
});

// ========== İLAN TASLAKLARI ==========
app.get('/api/drafts', jwtMiddleware, async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { sql: s, params: p } = paramStyle('SELECT id, data, updated_at FROM ad_drafts WHERE user_id = ? ORDER BY updated_at DESC', [userId]);
    const rows = await db.queryAsync(s, p);
    res.json(rows.map(r => ({ ...r, data: typeof r.data === 'string' ? JSON.parse(r.data) : r.data })));
  } catch (e) { next(e); }
});

app.post('/api/drafts', jwtMiddleware, async (req, res, next) => {
  try {
    const userId = req.user.id;
    const data = JSON.stringify(req.body.data || {});
    const { sql: s, params: p } = insertReturningId('INSERT INTO ad_drafts (user_id, data) VALUES (?, ?)', [userId, data]);
    const r = await db.runAsync(s, p);
    res.status(201).json({ id: r.insertId ?? r.insert_id });
  } catch (e) { next(e); }
});

app.put('/api/drafts/:id', jwtMiddleware, async (req, res, next) => {
  try {
    const draftId = parseInt(req.params.id, 10);
    const userId = req.user.id;
    const data = JSON.stringify(req.body.data || {});
    const { sql: s, params: p } = paramStyle('UPDATE ad_drafts SET data = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?', [data, draftId, userId]);
    await db.runAsync(s, p);
    res.json({ ok: true });
  } catch (e) { next(e); }
});

app.delete('/api/drafts/:id', jwtMiddleware, async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { sql: s, params: p } = paramStyle('DELETE FROM ad_drafts WHERE id = ? AND user_id = ?', [parseInt(req.params.id), userId]);
    await db.runAsync(s, p);
    res.json({ ok: true });
  } catch (e) { next(e); }
});

// ========== KULLANICI PUANLAMALARI ==========
app.post('/api/ratings', jwtMiddleware, async (req, res, next) => {
  try {
    const fromId = req.user.id;
    const { toUserId, adId, conversationId, rating, comment } = req.body;
    if (!toUserId || !rating || rating < 1 || rating > 5) return res.status(400).json({ error: 'Geçersiz puanlama' });
    const { sql: s, params: p } = paramStyle('INSERT INTO user_ratings (from_user_id, to_user_id, ad_id, conversation_id, rating, comment) VALUES (?, ?, ?, ?, ?, ?)', [fromId, toUserId, adId || null, conversationId || null, rating, (comment || '').slice(0, 500)]);
    await db.runAsync(s, p);
    const { sql: u, params: up } = paramStyle('UPDATE conversations SET rated = 1 WHERE id = ?', [conversationId]);
    if (conversationId) await db.runAsync(u, up);
    res.status(201).json({ ok: true });
  } catch (e) { next(e); }
});

app.get('/api/users/:id/ratings', async (req, res, next) => {
  try {
    const toUserId = parseInt(req.params.id);
    const { sql: s, params: p } = paramStyle('SELECT r.rating, r.comment, r.created_at, u.name as from_name FROM user_ratings r LEFT JOIN users u ON r.from_user_id = u.id WHERE r.to_user_id = ? ORDER BY r.created_at DESC LIMIT 20', [toUserId]);
    const rows = await db.queryAsync(s, p);
    const avg = rows.length ? rows.reduce((a, x) => a + x.rating, 0) / rows.length : 0;
    res.json({ avg: Math.round(avg * 10) / 10, count: rows.length, ratings: rows });
  } catch (e) { next(e); }
});

// ========== POPÜLER ARAMALAR ==========
app.get('/api/popular-searches', async (req, res, next) => {
  try {
    const limit = Math.min(parseInt(req.query.limit) || 10, 20);
    const { sql: s, params: p } = paramStyle('SELECT query, hit_count FROM popular_searches ORDER BY hit_count DESC LIMIT ?', [limit]);
    const rows = await db.queryAsync(s, p);
    res.json(rows);
  } catch (e) { next(e); }
});

app.post('/api/popular-searches', async (req, res, next) => {
  try {
    const q = (req.body.query || '').trim().toLowerCase().slice(0, 200);
    if (!q) return res.status(400).json({ error: 'Query gerekli' });
    const { sql: s1, params: p1 } = paramStyle('SELECT id, hit_count FROM popular_searches WHERE query = ?', [q]);
    const existing = await db.getAsync(s1, p1);
    if (existing) {
      const { sql: s2, params: p2 } = paramStyle('UPDATE popular_searches SET hit_count = ? WHERE id = ?', [(existing.hit_count || 0) + 1, existing.id]);
      await db.runAsync(s2, p2);
    } else {
      const { sql: s2, params: p2 } = paramStyle('INSERT INTO popular_searches (query, hit_count) VALUES (?, 1)', [q]);
      await db.runAsync(s2, p2);
    }
    res.json({ ok: true });
  } catch (e) { next(e); }
});

// ========== TELEFON GÖRÜNTÜLEME ==========
app.post('/api/ads/:id/phone-view', jwtMiddleware, async (req, res, next) => {
  try {
    const adId = parseInt(req.params.id);
    const userId = req.user.id;
    const { sql: s, params: p } = paramStyle('INSERT INTO phone_views (ad_id, user_id) VALUES (?, ?)', [adId, userId]);
    await db.runAsync(s, p);
    res.json({ ok: true });
  } catch (e) { next(e); }
});

// ========== ARAMA KAYDI (Search Alerts) ==========
app.post('/api/search-alerts', jwtMiddleware, async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { query, filters, email } = req.body;
    const filtersStr = JSON.stringify(filters || {});
    const { sql: s1, params: p1 } = paramStyle('SELECT email FROM users WHERE id = ?', [userId]);
    const u = await db.getAsync(s1, p1);
    const em = email || (u && u.email) || '';
    const { sql: s, params: p } = insertReturningId('INSERT INTO search_alerts (user_id, query, filters, email, active) VALUES (?, ?, ?, ?, 1)', [userId, (query || '').slice(0, 500), filtersStr, em]);
    const r = await db.runAsync(s, p);
    res.status(201).json({ id: r.insertId ?? r.insert_id });
  } catch (e) {
    next(e);
  }
});

app.get('/api/search-alerts', jwtMiddleware, async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { sql: s, params: p } = paramStyle('SELECT id, query, filters, active, created_at FROM search_alerts WHERE user_id = ? ORDER BY id DESC', [userId]);
    const rows = await db.queryAsync(s, p);
    res.json(rows.map(r => ({ ...r, filters: r.filters ? JSON.parse(r.filters) : {} })));
  } catch (e) {
    next(e);
  }
});

// ========== MESAJLAŞMA ==========
app.get('/api/conversations', jwtMiddleware, async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { sql: s, params: p } = paramStyle(
      'SELECT c.*, a.title as ad_title, a.images as ad_images FROM conversations c LEFT JOIN ads a ON c.ad_id = a.id WHERE c.seller_id = ? OR c.buyer_id = ? ORDER BY c.last_msg_time DESC',
      [userId, userId]
    );
    const rows = await db.queryAsync(s, p);
    res.json(rows.map(r => ({ ...r, ad_images: r.ad_images ? JSON.parse(r.ad_images) : [] })));
  } catch (e) {
    next(e);
  }
});

app.get('/api/conversations/:id/messages', jwtMiddleware, async (req, res, next) => {
  try {
    const convId = parseInt(req.params.id, 10);
    const userId = req.user.id;
    const { sql: s1, params: p1 } = paramStyle('SELECT id FROM conversations WHERE id = ? AND (seller_id = ? OR buyer_id = ?)', [convId, userId, userId]);
    const conv = await db.getAsync(s1, p1);
    if (!conv) return res.status(404).json({ error: 'Konuşma bulunamadı' });
    const { sql: s2, params: p2 } = paramStyle('SELECT id, conversation_id, from_user_id, text, time, read_at FROM messages WHERE conversation_id = ? ORDER BY time ASC', [convId]);
    const rows = await db.queryAsync(s2, p2);
    res.json(rows);
  } catch (e) {
    next(e);
  }
});

app.post('/api/conversations', jwtMiddleware, async (req, res, next) => {
  try {
    const { adId } = req.body;
    const buyerId = req.user.id;
    const { sql: s1, params: p1 } = paramStyle('SELECT id, user_id FROM ads WHERE id = ?', [adId]);
    const ad = await db.getAsync(s1, p1);
    if (!ad) return res.status(404).json({ error: 'İlan bulunamadı' });
    const sellerId = ad.user_id;
    if (buyerId === sellerId) return res.status(400).json({ error: 'Kendi ilanınızla konuşamazsınız' });
    const { sql: s2, params: p2 } = paramStyle('SELECT id FROM conversations WHERE ad_id = ? AND buyer_id = ?', [adId, buyerId]);
    let conv = await db.getAsync(s2, p2);
    if (!conv) {
      const now = Date.now();
      const { sql: s3, params: p3 } = insertReturningId('INSERT INTO conversations (ad_id, seller_id, buyer_id, last_msg_time) VALUES (?, ?, ?, ?)', [adId, sellerId, buyerId, now]);
      const r = await db.runAsync(s3, p3);
      conv = { id: r.insertId ?? r.insert_id };
    }
    res.status(201).json({ id: conv.id });
  } catch (e) {
    next(e);
  }
});

app.post('/api/conversations/:id/messages', jwtMiddleware, async (req, res, next) => {
  try {
    const convId = parseInt(req.params.id, 10);
    const userId = req.user.id;
    const { text } = req.body;
    const { sql: s1, params: p1 } = paramStyle('SELECT id FROM conversations WHERE id = ? AND (seller_id = ? OR buyer_id = ?)', [convId, userId, userId]);
    const conv = await db.getAsync(s1, p1);
    if (!conv) return res.status(404).json({ error: 'Konuşma bulunamadı' });
    const now = Date.now();
    const { sql: s2, params: p2 } = insertReturningId('INSERT INTO messages (conversation_id, from_user_id, text, time) VALUES (?, ?, ?, ?)', [convId, userId, (text || '').slice(0, 2000), now]);
    const r = await db.runAsync(s2, p2);
    const { sql: u, params: up } = paramStyle('UPDATE conversations SET last_msg_time = ? WHERE id = ?', [now, convId]);
    await db.runAsync(u, up);
    res.status(201).json({ id: r.insertId ?? r.insert_id });
  } catch (e) {
    next(e);
  }
});

app.patch('/api/conversations/:id/messages/read', jwtMiddleware, async (req, res, next) => {
  try {
    const convId = parseInt(req.params.id, 10);
    const userId = req.user.id;
    const { sql: s1, params: p1 } = paramStyle('SELECT id FROM conversations WHERE id = ? AND (seller_id = ? OR buyer_id = ?)', [convId, userId, userId]);
    const conv = await db.getAsync(s1, p1);
    if (!conv) return res.status(404).json({ error: 'Konuşma bulunamadı' });
    const now = Date.now();
    const { sql: s2, params: p2 } = paramStyle('UPDATE messages SET read_at = ? WHERE conversation_id = ? AND from_user_id != ? AND read_at IS NULL', [now, convId, userId]);
    await db.runAsync(s2, p2);
    res.json({ ok: true });
  } catch (e) {
    next(e);
  }
});

// ========== WEB PUSH ==========
let webPush = null;
try {
  webPush = require('web-push');
  if (config.vapid?.publicKey && config.vapid?.privateKey) {
    webPush.setVapidDetails('mailto:info@alsatmk.com', config.vapid.publicKey, config.vapid.privateKey);
  }
} catch (e) { /* web-push yoksa skip */ }

app.post('/api/push/subscribe', jwtMiddleware, async (req, res, next) => {
  try {
    if (!webPush || !config.vapid?.publicKey) return res.status(503).json({ error: 'Web Push yapılandırılmamış' });
    const userId = req.user.id;
    const sub = req.body;
    if (!sub || !sub.endpoint) return res.status(400).json({ error: 'Geçerli subscription gerekli' });
    const endpoint = String(sub.endpoint || '').slice(0, 2000);
    const keys = sub.keys || {};
    const p256dh = keys.p256dh ? String(keys.p256dh).slice(0, 500) : null;
    const auth = keys.auth ? String(keys.auth).slice(0, 200) : null;
    const ua = (req.headers['user-agent'] || '').slice(0, 500);
    const { sql: del, params: dp } = paramStyle('DELETE FROM web_push_subscriptions WHERE user_id = ? AND endpoint = ?', [userId, endpoint]);
    await db.runAsync(del, dp);
    const { sql: ins, params: ip } = paramStyle(
      'INSERT INTO web_push_subscriptions (user_id, endpoint, p256dh, auth, user_agent) VALUES (?, ?, ?, ?, ?)',
      [userId, endpoint, p256dh, auth, ua]
    );
    await db.runAsync(ins, ip);
    res.json({ ok: true });
  } catch (e) {
    next(e);
  }
});

// ========== DOSYA YÜKLEME (Base64 veya Cloudinary) ==========
let uploadMiddleware = null;
try {
  const multer = require('multer');
  uploadMiddleware = multer({ storage: multer.memoryStorage(), limits: { fileSize: 5 * 1024 * 1024 } }).single('file');
} catch (e) { /* multer yoksa skip */ }
if (uploadMiddleware) {
  app.post('/api/upload', jwtMiddleware, (req, res, next) => uploadMiddleware(req, res, err => err ? next(err) : next()), async (req, res, next) => {
    try {
      if (!req.file) return res.status(400).json({ error: 'Dosya gerekli' });
      const cloudinaryUrl = process.env.CLOUDINARY_URL;
      if (cloudinaryUrl) {
        try {
          const cloudinary = require('cloudinary').v2;
          cloudinary.config({ url: cloudinaryUrl });
          const b64 = 'data:' + req.file.mimetype + ';base64,' + req.file.buffer.toString('base64');
          const result = await cloudinary.uploader.upload(b64, { folder: 'alsat' });
          return res.json({ url: result.secure_url });
        } catch (ce) { /* fallback to base64 */ }
      }
      const base64 = 'data:' + req.file.mimetype + ';base64,' + req.file.buffer.toString('base64');
      res.json({ url: base64 });
    } catch (e) {
      next(e);
    }
  });
}

// ========== ADMIN ==========
function requireAdminJwt(req, res, next) {
  const em = (req.user?.email || '').toLowerCase().trim();
  if (!em || em !== (config.admin.email || '').toLowerCase().trim()) {
    return res.status(403).json({ error: 'Yetkisiz' });
  }
  next();
}

app.post('/api/admin/reset', async (req, res, next) => {
  if (config.admin.resetToken && req.headers['x-admin-token'] !== config.admin.resetToken) {
    return res.status(403).json({ error: 'Yetkisiz' });
  }
  try {
    const del = async (sql, params = []) => {
      const { sql: s, params: p } = paramStyle(sql, params);
      await db.runAsync(s, p);
    };
    try { await del('DELETE FROM ad_reports'); } catch (e) {}
    try { await del('DELETE FROM search_alerts'); } catch (e) {}
    try { await del('DELETE FROM messages'); } catch (e) {}
    try { await del('DELETE FROM conversations'); } catch (e) {}
    await del('DELETE FROM favorites');
    await del('DELETE FROM ads');
    const { sql: admSql, params: admParams } = paramStyle('SELECT id FROM users WHERE LOWER(TRIM(email)) = ?', [config.admin.email]);
    const adminRow = await db.getAsync(admSql, admParams);
    if (adminRow) {
      await del('DELETE FROM users WHERE id != ?', [adminRow.id]);
    } else {
      await del('DELETE FROM users');
    }
    audit('admin_reset', { ip: req.ip });
    res.json({ ok: true });
  } catch (e) {
    next(e);
  }
});

app.get('/api/admin/online-users', (req, res) => {
  if (config.admin.resetToken && req.headers['x-admin-token'] !== config.admin.resetToken) {
    return res.status(403).json({ error: 'Yetkisiz' });
  }
  const sessions = getOnlineUsers();
  res.json({
    total: sessions.length,
    uniqueIps: [...new Set(sessions.map(s => s.ip))].length,
    users: sessions.map(s => ({ ip: s.ip, userAgent: (s.userAgent || '').slice(0, 120), userId: s.userId, lastActivity: new Date(s.lastActivity).toISOString() }))
  });
});

app.get('/api/admin/audit', (req, res) => {
  if (config.admin.resetToken && req.headers['x-admin-token'] !== config.admin.resetToken) {
    return res.status(403).json({ error: 'Yetkisiz' });
  }
  res.json(getAuditLog(parseInt(req.query.limit) || 100));
});

app.get('/api/admin/reports', async (req, res, next) => {
  if (config.admin.resetToken && req.headers['x-admin-token'] !== config.admin.resetToken) {
    return res.status(403).json({ error: 'Yetkisiz' });
  }
  try {
    const rows = await db.queryAsync(
      'SELECT r.*, a.title as ad_title, a.user_id as ad_owner_id, u.email as reporter_email FROM ad_reports r LEFT JOIN ads a ON r.ad_id = a.id LEFT JOIN users u ON r.user_id = u.id ORDER BY r.created_at DESC LIMIT 100'
    );
    res.json(rows);
  } catch (e) {
    next(e);
  }
});

app.post('/api/admin/reports/:id/action', async (req, res, next) => {
  if (config.admin.resetToken && req.headers['x-admin-token'] !== config.admin.resetToken) {
    return res.status(403).json({ error: 'Yetkisiz' });
  }
  try {
    const reportId = parseInt(req.params.id, 10);
    const { action } = req.body;
    const { sql: s, params: p } = paramStyle('SELECT ad_id FROM ad_reports WHERE id = ?', [reportId]);
    const report = await db.getAsync(s, p);
    if (!report) return res.status(404).json({ error: 'Rapor bulunamadı' });
    if (action === 'dismiss') {
      const { sql: d, params: dp } = paramStyle('DELETE FROM ad_reports WHERE id = ?', [reportId]);
      await db.runAsync(d, dp);
    } else if (action === 'reject_ad') {
      const { sql: u, params: up } = paramStyle('UPDATE ads SET status = ? WHERE id = ?', ['rejected', report.ad_id]);
      await db.runAsync(u, up);
      const { sql: d, params: dp } = paramStyle('DELETE FROM ad_reports WHERE id = ?', [reportId]);
      await db.runAsync(d, dp);
      audit('ad_rejected_by_report', { adId: report.ad_id, reportId });
    }
    res.json({ ok: true });
  } catch (e) {
    next(e);
  }
});

// Admin ilan yönetimi (JWT admin)
app.get('/api/admin/ads', jwtMiddleware, requireAdminJwt, async (req, res, next) => {
  try {
    const status = (req.query.status || '').trim();
    const allowed = ['pending', 'approved', 'rejected'];
    let sql = 'SELECT * FROM ads';
    const params = [];
    if (status && allowed.includes(status)) {
      sql += ' WHERE status = ?';
      params.push(status);
    }
    sql += ' ORDER BY id DESC LIMIT 500';
    const { sql: s, params: p } = paramStyle(sql, params);
    const rows = await db.queryAsync(s, p);
    res.json(rows.map(parseAdRow));
  } catch (e) {
    next(e);
  }
});

app.patch('/api/admin/ads/:id/status', jwtMiddleware, requireAdminJwt, async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    const status = String(req.body?.status || '').trim();
    if (!['pending', 'approved', 'rejected'].includes(status)) {
      return res.status(400).json({ error: 'Geçersiz status' });
    }
    const { sql: u, params: up } = paramStyle('UPDATE ads SET status = ? WHERE id = ?', [status, id]);
    await db.runAsync(u, up);
    audit('admin_ad_status', { adId: id, status, admin: req.user?.email });
    res.json({ ok: true });
  } catch (e) {
    next(e);
  }
});

app.delete('/api/admin/ads/:id', jwtMiddleware, requireAdminJwt, async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    // bağlı kayıtlar temizle
    try { const { sql: f1, params: p1 } = paramStyle('DELETE FROM favorites WHERE ad_id = ?', [id]); await db.runAsync(f1, p1); } catch (e) {}
    try { const { sql: r1, params: pr } = paramStyle('DELETE FROM ad_reports WHERE ad_id = ?', [id]); await db.runAsync(r1, pr); } catch (e) {}
    const { sql: d, params: dp } = paramStyle('DELETE FROM ads WHERE id = ?', [id]);
    await db.runAsync(d, dp);
    audit('admin_ad_deleted', { adId: id, admin: req.user?.email });
    res.json({ ok: true });
  } catch (e) {
    next(e);
  }
});

// ========== PUBLIC CONFIG (reCAPTCHA site key, VAPID public - frontend için) ==========
app.get('/api/config', (req, res) => {
  res.json({
    recaptchaSiteKey: config.recaptcha?.siteKey || '',
    vapidPublicKey: config.vapid?.publicKey || '',
    adminEmail: (config.admin.email || 'info@alsatmk.com').toLowerCase()
  });
});

// ========== HEALTH ==========
app.get('/api/health', async (req, res) => {
  let dbOk = false;
  try {
    await db.queryAsync('SELECT 1');
    dbOk = true;
  } catch (e) {}
  const hasResend = !!(process.env.RESEND_API_KEY || '').trim();
  const hasSendgrid = !!(process.env.SENDGRID_API_KEY || '').trim();
  const hasSmtp = !!(process.env.SMTP_PASS || '').replace(/\s+/g, '');
  let emailMode = 'none';
  if (hasResend) emailMode = 'resend';
  else if (hasSendgrid) emailMode = 'sendgrid';
  else if (hasSmtp) emailMode = 'smtp';

  res.json({
    status: dbOk ? 'ok' : 'degraded',
    db: driver,
    dbOk,
    emailMode,
    uptime: process.uptime(),
    memory: process.memoryUsage()
  });
});

// API Docs (Swagger)
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: '3.0.0',
    info: { title: 'Alsat API', version: '1.0.0' }
  },
  apis: ['./server.js']
});
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, { explorer: true }));

// Frontend: yerelde repo kökü; Docker’da backend/static/
const siteRoot = fs.existsSync(path.join(__dirname, 'static', 'index.html'))
  ? path.join(__dirname, 'static')
  : path.join(__dirname, '..');
if (fs.existsSync(path.join(siteRoot, 'index.html'))) {
  app.use(express.static(siteRoot, { index: 'index.html' }));
} else {
  app.get('/', (req, res) => {
    res.type('html');
    res.send(
      '<!DOCTYPE html><html lang="tr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>Alsat API</title></head>' +
        '<body style="font-family:system-ui,sans-serif;padding:2rem;line-height:1.5;max-width:36rem">' +
        '<h1>Alsat API</h1><p>Sunucu çalışıyor (statik site yok).</p>' +
        '<ul><li><a href="/api/health">/api/health</a></li><li><a href="/api-docs">/api-docs</a></li></ul>' +
        '</body></html>'
    );
  });
}

app.use(notFound);
app.use(errorHandler);

async function seedAdminIfEmpty() {
  try {
    const { sql: s, params: p } = paramStyle('SELECT COUNT(*) as c FROM users', []);
    const row = await db.getAsync(s, p);
    if (row && Number(row.c || row.C) > 0) return;
    const seedEmail = (process.env.SMTP_USER || config.admin.email || 'info@alsatmk.com').toLowerCase();
    const hash = hashPassword(process.env.SEED_PASSWORD || 'alsat123');
    const now = new Date().toISOString();
    const { sql: ins, params: pin } = paramStyle(
      'INSERT INTO users (email, name, password_hash, created_at) VALUES (?, ?, ?, ?)',
      [seedEmail, 'Admin', hash, now]
    );
    await db.runAsync(ins, pin);
    logger.info(`İlk kullanıcı oluşturuldu: ${seedEmail} - Giriş: alsat123 veya şifre sıfırlama kullanın`);
  } catch (e) {
    logger.warn('Seed hatası:', e.message);
  }
}

if (require.main === module) {
  const server = app.listen(config.port, '0.0.0.0', async () => {
    const { networkInterfaces } = require('os');
    const nets = networkInterfaces();
    let ips = [];
    for (const n of Object.values(nets)) {
      for (const i of n || []) {
        if (i.family === 'IPv4' && !i.internal) ips.push(i.address);
      }
    }
    logger.info(`Alsat: http://localhost:${config.port} (Site + API) | DB: ${driver}`);
    if (ips.length) logger.info(`Diğer cihazlardan: http://${ips[0]}:${config.port}`);
    await seedAdminIfEmpty();
  });
}

module.exports = app;

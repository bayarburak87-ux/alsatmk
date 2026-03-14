/**
 * Alsat API - Node.js + Express
 * Veritabanı: PostgreSQL | MySQL | SQLite (env'den seçilir)
 * Başlangıç: npm install && npm run dev
 */
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({ origin: true })); // Tüm origin'lere izin (production'da kısıtlayın)
app.use(express.json({ limit: '10mb' }));

const driver = process.env.DB_DRIVER || 'sqlite';
const isSqlite = driver === 'sqlite';

// SQLite tablolarını oluştur
if (isSqlite) {
  const Database = require('better-sqlite3');
  const sqlite = new Database(path.join(__dirname, 'alsat.db'));
  sqlite.exec(`
    CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT UNIQUE, name TEXT, password_hash TEXT, phone TEXT, banned INTEGER DEFAULT 0, created_at TEXT);
    CREATE TABLE IF NOT EXISTS ads (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER, title TEXT, price REAL, currency TEXT, category TEXT, sub_category TEXT, city TEXT, district TEXT, description TEXT, images TEXT, video TEXT, attrs TEXT, condition TEXT, seller_type TEXT, status TEXT DEFAULT 'approved', views INTEGER DEFAULT 0, clicks INTEGER DEFAULT 0, fav_count INTEGER DEFAULT 0, accept_trade INTEGER DEFAULT 0, price_history TEXT, sold_at TEXT, created_at TEXT, expiry_at TEXT, featured INTEGER DEFAULT 0, urgent INTEGER DEFAULT 0);
    CREATE TABLE IF NOT EXISTS favorites (user_id INTEGER, ad_id INTEGER, PRIMARY KEY(user_id, ad_id));
  `);
}

// Param placeholder: PostgreSQL $1,$2 | MySQL ? | SQLite ?
function paramStyle(sql, params) {
  if (!params || params.length === 0) return { sql, params };
  if (driver === 'postgres') {
    let i = 0;
    const newSql = sql.replace(/\?/g, () => '$' + (++i));
    return { sql: newSql, params };
  }
  return { sql, params };
}

// ========== İLANLAR ==========
app.get('/api/ads', async (req, res) => {
  try {
    const { category, city, minPrice, maxPrice, search } = req.query;
    let sql = 'SELECT * FROM ads WHERE status = ?';
    const params = ['approved'];
    if (category && category !== 'all') { sql += ' AND (category = ? OR sub_category = ?)'; params.push(category, category); }
    if (city) { sql += ' AND city = ?'; params.push(city); }
    if (minPrice) { sql += ' AND price >= ?'; params.push(parseFloat(minPrice)); }
    if (maxPrice) { sql += ' AND price <= ?'; params.push(parseFloat(maxPrice)); }
    if (search) { sql += ' AND (title LIKE ? OR description LIKE ?)'; params.push('%' + search + '%', '%' + search + '%'); }
    sql += ' ORDER BY id DESC LIMIT 200';
    const { sql: s, params: p } = paramStyle(sql, params);
    const rows = await db.queryAsync(s, p);
    const out = rows.map(r => ({
      ...r,
      images: typeof r.images === 'string' ? (r.images ? JSON.parse(r.images) : []) : r.images,
      attrs: typeof r.attrs === 'string' ? (r.attrs ? JSON.parse(r.attrs) : null) : r.attrs,
      priceHistory: typeof r.price_history === 'string' ? (r.price_history ? JSON.parse(r.price_history) : null) : r.price_history
    }));
    res.json(out);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.get('/api/ads/:id', async (req, res) => {
  try {
    const { sql: s, params: p } = paramStyle('SELECT * FROM ads WHERE id = ?', [parseInt(req.params.id)]);
    const row = await db.getAsync(s, p);
    if (!row) return res.status(404).json({ error: 'İlan bulunamadı' });
    const r = { ...row };
    if (typeof r.images === 'string') r.images = r.images ? JSON.parse(r.images) : [];
    if (typeof r.attrs === 'string') r.attrs = r.attrs ? JSON.parse(r.attrs) : null;
    if (typeof r.price_history === 'string') r.priceHistory = r.price_history ? JSON.parse(r.price_history) : null;
    res.json(r);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.post('/api/ads', async (req, res) => {
  try {
    const d = req.body;
    const images = JSON.stringify(d.images || []);
    const attrs = JSON.stringify(d.attrs || {});
    const priceHistory = JSON.stringify(d.priceHistory || [{ price: d.price, currency: d.currency || 'EUR', date: new Date().toISOString() }]);
    const createdAt = new Date().toISOString().slice(0, 10);
    const expiry = new Date();
    expiry.setDate(expiry.getDate() + (d.durationDays || 30));
    const expiryAt = expiry.toISOString().slice(0, 10);
    const insertCols = 'user_id, title, price, currency, category, sub_category, city, district, description, images, attrs, condition, seller_type, status, accept_trade, price_history, created_at, expiry_at';
    const insertVals = '?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?';
    const insertParams = [d.userId, d.title, d.price, d.currency || 'EUR', d.category, d.subCategory, d.city, d.district, d.description || '', images, attrs, d.condition || 'İkinci El', d.sellerType || 'Sahibinden', d.status || 'pending', d.acceptTrade ? 1 : 0, priceHistory, createdAt, expiryAt];
    let insertSql = `INSERT INTO ads (${insertCols}) VALUES (${insertVals})`;
    if (driver === 'postgres') insertSql += ' RETURNING id';
    const { sql: s, params: p } = paramStyle(insertSql, insertParams);
    const r = await db.runAsync(s, p);
    res.status(201).json({ id: r.insertId ?? r.insert_id });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// ========== TÜM İLANLAR (Admin / sync) ==========
app.get('/api/ads-full', async (req, res) => {
  try {
    const rows = await db.queryAsync('SELECT * FROM ads ORDER BY id DESC LIMIT 500');
    const out = rows.map(r => {
      const o = { ...r };
      if (typeof o.images === 'string') o.images = o.images ? JSON.parse(o.images) : [];
      if (typeof o.attrs === 'string') o.attrs = o.attrs ? JSON.parse(o.attrs) : null;
      if (o.price_history) o.priceHistory = typeof o.price_history === 'string' ? JSON.parse(o.price_history) : o.price_history;
      return o;
    });
    res.json(out);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// ========== KULLANICILAR ==========
app.get('/api/users', async (req, res) => {
  try {
    const rows = await db.queryAsync('SELECT id, email, name, phone, banned, created_at FROM users');
    const obj = {};
    rows.forEach(r => { obj[r.id] = r; });
    res.json(obj);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.get('/api/users/:id', async (req, res) => {
  try {
    const { sql: s, params: p } = paramStyle('SELECT id, email, name, phone, banned, created_at FROM users WHERE id = ?', [parseInt(req.params.id)]);
    const row = await db.getAsync(s, p);
    if (!row) return res.status(404).json({ error: 'Kullanıcı bulunamadı' });
    res.json(row);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, name, password } = req.body;
    const bcrypt = require('bcryptjs');
    const hash = bcrypt.hashSync(password || '', 10);
    const { sql: s, params: p } = paramStyle('INSERT INTO users (email, name, password_hash) VALUES (?, ?, ?)', [email, name || 'Kullanıcı', hash]);
    const r = await db.runAsync(s, p);
    res.status(201).json({ id: r.insertId || r.insert_id });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// ========== FAVORİLER ==========
app.get('/api/favorites/:userId', async (req, res) => {
  try {
    const { sql: s, params: p } = paramStyle('SELECT ad_id FROM favorites WHERE user_id = ?', [parseInt(req.params.userId)]);
    const rows = await db.queryAsync(s, p);
    res.json(rows.map(r => r.ad_id));
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.post('/api/favorites', async (req, res) => {
  try {
    const { userId, adId } = req.body;
    let sql = 'INSERT INTO favorites (user_id, ad_id) VALUES (?, ?)';
    if (driver === 'postgres') sql += ' ON CONFLICT (user_id, ad_id) DO NOTHING';
    else if (driver === 'mysql') sql += ' ON DUPLICATE KEY UPDATE ad_id = VALUES(ad_id)';
    else sql = 'INSERT OR REPLACE INTO favorites (user_id, ad_id) VALUES (?, ?)';
    const { sql: s, params: p } = paramStyle(sql, [userId, adId]);
    await db.runAsync(s, p);
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.delete('/api/favorites/:userId/:adId', async (req, res) => {
  try {
    const { sql: s, params: p } = paramStyle('DELETE FROM favorites WHERE user_id = ? AND ad_id = ?', [parseInt(req.params.userId), parseInt(req.params.adId)]);
    await db.runAsync(s, p);
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// ========== SAĞLIK ==========
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', db: driver });
});

app.listen(PORT, () => {
  console.log('Alsat API: http://localhost:' + PORT + ' | DB: ' + driver);
});

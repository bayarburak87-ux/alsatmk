/**
 * Alsat - Güvenlik Modülü
 * JWT, rate limiting, şifre hash, temel korumalar
 */
require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const JWT_SECRET = process.env.JWT_SECRET || 'alsat-dev-secret-change-in-production';
const JWT_EXPIRES = process.env.JWT_EXPIRES || '7d';

// Rate limit: IP bazlı istek sayısı (in-memory)
const rateLimitMap = new Map();
const RATE_WINDOW_MS = 60 * 1000; // 1 dakika
const RATE_MAX = 100; // dakikada max 100 istek

/**
 * JWT token oluşturur
 * @param {{ id: number, email: string }} user
 * @returns {string} token
 */
function createToken(user) {
  return jwt.sign(
    { id: user.id, email: user.email },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES }
  );
}

/**
 * JWT doğrular, req.user set eder
 * Authorization: Bearer <token>
 */
function jwtMiddleware(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token gerekli' });
  }
  const token = auth.slice(7);
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    next();
  } catch (e) {
    return res.status(401).json({ error: 'Geçersiz veya süresi dolmuş token' });
  }
}

/**
 * Opsiyonel auth: token varsa req.user set eder, yoksa devam eder
 */
function optionalAuth(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) {
    return next();
  }
  const token = auth.slice(7);
  try {
    req.user = jwt.verify(token, JWT_SECRET);
  } catch (e) { /* ignore */ }
  next();
}

/**
 * Şifre hash'ler (bcrypt)
 */
function hashPassword(plain) {
  return bcrypt.hashSync(plain || '', 10);
}

/**
 * Şifre karşılaştırır
 */
function comparePassword(plain, hash) {
  return bcrypt.compareSync(plain || '', hash || '');
}

/**
 * Rate limiting middleware
 */
function rateLimit(req, res, next) {
  const ip = req.ip || req.connection?.remoteAddress || 'unknown';
  const now = Date.now();
  let entry = rateLimitMap.get(ip);
  if (!entry) {
    entry = { count: 0, resetAt: now + RATE_WINDOW_MS };
    rateLimitMap.set(ip, entry);
  }
  if (now > entry.resetAt) {
    entry.count = 0;
    entry.resetAt = now + RATE_WINDOW_MS;
  }
  entry.count++;
  if (entry.count > RATE_MAX) {
    return res.status(429).json({ error: 'Çok fazla istek, lütfen bekleyin' });
  }
  next();
}

/**
 * Basit XSS koruması: string'de tehlikeli karakterler var mı
 */
function sanitizeString(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .trim();
}

module.exports = {
  createToken,
  jwtMiddleware,
  optionalAuth,
  hashPassword,
  comparePassword,
  rateLimit,
  sanitizeString
};

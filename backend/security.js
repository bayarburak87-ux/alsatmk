/**
 * Alsat - Güvenlik Modülü
 * JWT, refresh token, rate limiting, brute-force koruması
 */
const config = require('./config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const { secret, expires, refreshExpires } = config.jwt;
const RATE_WINDOW_MS = config.rateLimit.windowMs;
const RATE_MAX = config.rateLimit.max;
const MAX_LOGIN_ATTEMPTS = config.login.maxAttempts;
const LOCKOUT_MS = config.login.lockoutMinutes * 60 * 1000;

const rateLimitMap = new Map();
const loginAttempts = new Map(); // ip -> { count, lockUntil }
const refreshTokens = new Map(); // tokenHash -> { userId, email, expires }

/**
 * JWT access token oluşturur
 */
function createToken(user) {
  return jwt.sign(
    { id: user.id, email: user.email },
    secret,
    { expiresIn: expires }
  );
}

/**
 * Refresh token oluşturur ve saklar
 */
function createRefreshToken(user) {
  const token = crypto.randomBytes(32).toString('hex');
  const hash = crypto.createHash('sha256').update(token).digest('hex');
  refreshTokens.set(hash, {
    userId: user.id,
    email: user.email,
    expires: Date.now() + 30 * 24 * 60 * 60 * 1000 // 30 gün
  });
  if (refreshTokens.size > 10000) {
    const keys = [...refreshTokens.keys()].slice(0, 1000);
    keys.forEach(k => refreshTokens.delete(k));
  }
  return token;
}

/**
 * Refresh token ile yeni access token alır
 */
function refreshAccessToken(refreshToken) {
  const hash = crypto.createHash('sha256').update(refreshToken).digest('hex');
  const entry = refreshTokens.get(hash);
  if (!entry || Date.now() > entry.expires) {
    refreshTokens.delete(hash);
    return null;
  }
  return createToken({ id: entry.userId, email: entry.email });
}

function jwtMiddleware(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token gerekli' });
  }
  const token = auth.slice(7);
  try {
    const payload = jwt.verify(token, secret);
    req.user = payload;
    next();
  } catch (e) {
    return res.status(401).json({ error: 'Geçersiz veya süresi dolmuş token' });
  }
}

function optionalAuth(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) return next();
  const token = auth.slice(7);
  try {
    req.user = jwt.verify(token, secret);
  } catch (e) { /* ignore */ }
  next();
}

function hashPassword(plain) {
  return bcrypt.hashSync(plain || '', 10);
}

function comparePassword(plain, hash) {
  return bcrypt.compareSync(plain || '', hash || '');
}

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
 * Login brute-force koruması - IP bazlı
 * Başarılı girişte resetlenir
 */
function checkLoginLockout(ip) {
  const entry = loginAttempts.get(ip);
  if (!entry) return null;
  if (Date.now() < entry.lockUntil) {
    const mins = Math.ceil((entry.lockUntil - Date.now()) / 60000);
    return `Çok fazla başarısız deneme. ${mins} dakika sonra tekrar deneyin.`;
  }
  loginAttempts.delete(ip);
  return null;
}

function recordLoginFailure(ip) {
  const entry = loginAttempts.get(ip) || { count: 0 };
  entry.count++;
  if (entry.count >= MAX_LOGIN_ATTEMPTS) {
    entry.lockUntil = Date.now() + LOCKOUT_MS;
    entry.count = 0;
  }
  loginAttempts.set(ip, entry);
}

function recordLoginSuccess(ip) {
  loginAttempts.delete(ip);
}

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
  createRefreshToken,
  refreshAccessToken,
  jwtMiddleware,
  optionalAuth,
  hashPassword,
  comparePassword,
  rateLimit,
  checkLoginLockout,
  recordLoginFailure,
  recordLoginSuccess,
  sanitizeString
};

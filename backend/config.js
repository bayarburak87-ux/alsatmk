/**
 * Alsat API Konfigürasyonu
 */
require('dotenv').config();

/** Railway'de çoğu zaman sadece DATABASE_URL verilir; DB_DRIVER yoksa sqlite sanılıp Postgres'e hiç bağlanılmazdı. */
function inferDbDriver() {
  const explicit = (process.env.DB_DRIVER || '').trim().toLowerCase();
  if (explicit === 'postgres' || explicit === 'mysql' || explicit === 'sqlite') return explicit;
  const url = (process.env.DATABASE_URL || '').trim();
  if (/^postgres(ql)?:\/\//i.test(url)) return 'postgres';
  if (/^mysql2?:\/\//i.test(url)) return 'mysql';
  return 'sqlite';
}

module.exports = {
  port: parseInt(process.env.PORT, 10) || 3001,
  nodeEnv: process.env.NODE_ENV || 'development',
  isDev: (process.env.NODE_ENV || 'development') === 'development',

  db: {
    driver: inferDbDriver(),
    url: process.env.DATABASE_URL
  },

  jwt: {
    secret: process.env.JWT_SECRET || 'alsat-dev-secret-change-in-production',
    expires: process.env.JWT_EXPIRES || '7d',
    refreshExpires: process.env.JWT_REFRESH_EXPIRES || '30d'
  },

  cors: {
    origin: process.env.CORS_ORIGIN || true, // true = tüm origin'lere izin
    allowedOrigins: (process.env.CORS_ORIGINS || '').split(',').filter(Boolean)
  },

  rateLimit: {
    windowMs: 60 * 1000,
    max: parseInt(process.env.RATE_LIMIT_MAX, 10) || 100
  },

  login: {
    maxAttempts: 5,
    lockoutMinutes: 15
  },

  admin: {
    email: (process.env.ADMIN_EMAIL || 'info@alsatmk.com').toLowerCase(),
    resetToken: process.env.ADMIN_RESET_TOKEN
  },

  recaptcha: {
    siteKey: process.env.RECAPTCHA_SITE_KEY || '',
    secretKey: process.env.RECAPTCHA_SECRET_KEY || ''
  },

  vapid: {
    publicKey: process.env.VAPID_PUBLIC_KEY || '',
    privateKey: process.env.VAPID_PRIVATE_KEY || ''
  }
};

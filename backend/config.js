/**
 * Alsat API Konfigürasyonu
 */
require('dotenv').config();

module.exports = {
  port: parseInt(process.env.PORT, 10) || 3001,
  nodeEnv: process.env.NODE_ENV || 'development',
  isDev: (process.env.NODE_ENV || 'development') === 'development',

  db: {
    driver: process.env.DB_DRIVER || 'sqlite',
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

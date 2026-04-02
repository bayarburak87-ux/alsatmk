/**
 * Merkezi hata yakalama middleware
 */
const config = require('../config');
const { logger } = require('../logger');

function errorHandler(err, req, res, next) {
  logger.error(err.stack || err.message);
  const status = err.status || 500;
  const publicCodes = ['SMTP_NOT_CONFIGURED', 'SMTP_SEND_FAILED', 'MAIL_API_FAILED', 'MAIL_SEND_FAILED'];
  const sqliteBusy =
    err.code && (String(err.code).startsWith('SQLITE_') || err.code === 'SQLITE_BUSY' || err.code === 'SQLITE_LOCKED');
  const dbConn =
    err.code === 'ECONNREFUSED' ||
    err.code === 'ETIMEDOUT' ||
    err.code === 'ENOTFOUND' ||
    err.code === '57P01' ||
    (err.message && /connect ECONNREFUSED|Connection terminated|timeout expired|database system is shutting down/i.test(err.message));
  const pgMissingRelation = err.code === '42P01';
  const message =
    config.isDev || (err.code && publicCodes.includes(err.code))
      ? err.message
      : sqliteBusy
        ? 'Sunucu yoğun veya geçici olarak kullanılamıyor. Birkaç saniye sonra tekrar deneyin.'
        : dbConn
          ? 'Veritabanına şu an bağlanılamıyor. Bir süre sonra tekrar deneyin (sunucu DATABASE_URL / Postgres kontrolü).'
          : pgMissingRelation
            ? 'Veritabanı şeması eksik veya güncel değil. Yönetici: şema migration çalıştırılmalı.'
            : 'Sunucu hatası';
  res.status(status).json({ error: message });
}

function notFound(req, res) {
  res.status(404).json({ error: 'Bulunamadı' });
}

module.exports = { errorHandler, notFound };

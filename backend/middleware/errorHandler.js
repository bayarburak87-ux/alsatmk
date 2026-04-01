/**
 * Merkezi hata yakalama middleware
 */
const config = require('../config');
const { logger } = require('../logger');

function errorHandler(err, req, res, next) {
  logger.error(err.stack || err.message);
  const status = err.status || 500;
  const publicCodes = ['SMTP_NOT_CONFIGURED', 'SMTP_SEND_FAILED'];
  const message =
    config.isDev || (err.code && publicCodes.includes(err.code))
      ? err.message
      : 'Sunucu hatası';
  res.status(status).json({ error: message });
}

function notFound(req, res) {
  res.status(404).json({ error: 'Bulunamadı' });
}

module.exports = { errorHandler, notFound };

/**
 * Alsat - Request & Error Logging
 */
const config = require('./config');

function ts() {
  return new Date().toISOString();
}

const logger = {
  info(...args) {
    console.log(`[${ts()}]`, ...args);
  },
  error(...args) {
    console.error(`[${ts()}] ERROR`, ...args);
  },
  warn(...args) {
    console.warn(`[${ts()}] WARN`, ...args);
  },
  debug(...args) {
    if (config.isDev) console.log(`[${ts()}] DEBUG`, ...args);
  }
};

/**
 * Morgan benzeri HTTP request logger middleware
 */
function requestLogger(req, res, next) {
  const start = Date.now();
  res.on('finish', () => {
    const ms = Date.now() - start;
    const status = res.statusCode;
    const msg = `${req.method} ${req.originalUrl || req.url} ${status} ${ms}ms`;
    if (status >= 500) logger.error(msg);
    else if (status >= 400) logger.warn(msg);
    else logger.info(msg);
  });
  next();
}

module.exports = { logger, requestLogger };

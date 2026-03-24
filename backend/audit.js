/**
 * Alsat - Audit Log (Kim ne zaman ne yaptı)
 * Kritik işlemler kaydedilir
 */
const { logger } = require('./logger');

const auditLog = [];

function audit(action, details = {}) {
  const entry = {
    time: new Date().toISOString(),
    action,
    ...details
  };
  auditLog.push(entry);
  if (auditLog.length > 1000) auditLog.shift();
  logger.info('[AUDIT]', action, JSON.stringify(details));
}

function getAuditLog(limit = 100) {
  return auditLog.slice(-limit).reverse();
}

module.exports = { audit, getAuditLog };

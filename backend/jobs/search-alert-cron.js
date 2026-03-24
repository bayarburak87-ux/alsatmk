/**
 * Arama Kaydı E-posta Bildirimi
 * Yeni ilanlar eklendiğinde, search_alerts ile eşleşenlere e-posta gönderir
 * Kullanım: node jobs/search-alert-cron.js
 * Cron: Her 15 dakikada bir çalıştırılabilir
 */
require('dotenv').config();
const db = require('../db');
const { sendSearchAlertEmail } = require('../mail');

const driver = process.env.DB_DRIVER || 'sqlite';

function paramStyle(sql, params) {
  if (!params || params.length === 0) return { sql, params };
  if (driver === 'postgres') {
    let i = 0;
    return { sql: sql.replace(/\?/g, () => '$' + (++i)), params };
  }
  return { sql, params };
}

async function run() {
  const alerts = await db.queryAsync('SELECT * FROM search_alerts WHERE active = 1');
  const lastRun = process.env.SEARCH_ALERT_LAST_RUN ? parseInt(process.env.SEARCH_ALERT_LAST_RUN, 10) : Date.now() - 60 * 60 * 1000;

  for (const alert of alerts) {
    try {
      const filters = typeof alert.filters === 'string' ? JSON.parse(alert.filters || '{}') : alert.filters || {};
      let sql = 'SELECT * FROM ads WHERE status = ? AND created_at > ?';
      const params = ['approved', new Date(lastRun).toISOString().slice(0, 10)];
      if (alert.query) {
        sql += ' AND (title LIKE ? OR description LIKE ?)';
        params.push('%' + alert.query + '%', '%' + alert.query + '%');
      }
      if (filters.category) {
        sql += ' AND (category = ? OR sub_category = ?)';
        params.push(filters.category, filters.category);
      }
      if (filters.city) {
        sql += ' AND city = ?';
        params.push(filters.city);
      }
      if (filters.minPrice) {
        sql += ' AND price >= ?';
        params.push(parseFloat(filters.minPrice));
      }
      if (filters.maxPrice) {
        sql += ' AND price <= ?';
        params.push(parseFloat(filters.maxPrice));
      }
      sql += ' LIMIT 20';
      const { sql: s, params: p } = paramStyle(sql, params);
      const ads = await db.queryAsync(s, p);
      if (ads.length > 0 && alert.email) {
        await sendSearchAlertEmail(alert.email, alert.query, filters, ads);
      }
    } catch (e) {
      console.error('Search alert error:', alert.id, e);
    }
  }
  console.log('Search alert cron done at', new Date().toISOString());
}

run().catch(e => {
  console.error(e);
  process.exit(1);
});

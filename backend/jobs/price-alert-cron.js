/**
 * Fiyat Takibi E-posta Bildirimi
 * İlan fiyatı düştüğünde price_alerts ile eşleşenlere bildirim
 * Kullanım: node jobs/price-alert-cron.js
 * Cron: Her saat çalıştırılabilir
 */
require('dotenv').config();
const db = require('../db');
const { sendPriceDropEmail } = require('../mail');

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
  try {
    const alerts = await db.queryAsync('SELECT * FROM price_alerts WHERE notified = 0');
    for (const alert of alerts) {
      try {
        const { sql: s1, params: p1 } = paramStyle('SELECT email FROM users WHERE id = ?', [alert.user_id]);
        const userRow = await db.getAsync(s1, p1);
        const userEmail = userRow && userRow.email;
        const { sql: s2, params: p2 } = paramStyle('SELECT * FROM ads WHERE id = ?', [alert.ad_id]);
        const ad = await db.getAsync(s2, p2);
        if (!ad || !userEmail) continue;
        const priceNow = parseFloat(ad.price) || 0;
        const priceAtSubscribe = parseFloat(alert.price_at_subscribe) || priceNow;
        if (priceNow < priceAtSubscribe && priceNow > 0) {
          if (typeof sendPriceDropEmail === 'function') {
            await sendPriceDropEmail(userEmail, alert.ad_title || ad.title, priceAtSubscribe, priceNow, ad.currency || 'MKD', ad.id);
          }
          const { sql: u, params: up } = paramStyle('UPDATE price_alerts SET notified = 1 WHERE id = ?', [alert.id]);
          await db.runAsync(u, up);
        }
      } catch (e) {
        console.error('Price alert error:', alert.id, e);
      }
    }
    console.log('Price alert cron done at', new Date().toISOString());
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

run().catch(e => {
  console.error(e);
  process.exit(1);
});

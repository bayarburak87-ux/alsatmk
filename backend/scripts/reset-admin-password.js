/**
 * Geriye dönük uyumluluk — ensure-admin.js ile aynı işi yapar.
 * Tercih: node scripts/ensure-admin.js [şifre]
 */
require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });
require('./ensure-admin');

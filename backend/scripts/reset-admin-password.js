/**
 * Admin (ADMIN_EMAIL) şifresini sıfırlar — yerel SQLite için.
 * Kullanım: node scripts/reset-admin-password.js [yeniŞifre]
 * Şifre verilmezse rastgele üretilir ve konsola yazılır.
 */
require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });
const crypto = require('crypto');
const path = require('path');
const { hashPassword } = require('../security');
const config = require('../config');

const driver = process.env.DB_DRIVER || 'sqlite';
if (driver !== 'sqlite') {
  console.error('Bu script yalnızca DB_DRIVER=sqlite ile kullanılmalıdır.');
  process.exit(1);
}

const Database = require('better-sqlite3');
const sqlite = new Database(path.join(__dirname, '..', 'alsat.db'));
const em = config.admin.email;
const plain = process.argv[2] || 'Alsat-' + crypto.randomBytes(5).toString('hex');
const hash = hashPassword(plain);
const r = sqlite.prepare('UPDATE users SET password_hash = ? WHERE LOWER(TRIM(email)) = ?').run(hash, em);
if (r.changes === 0) {
  console.error('Güncellenemedi: bu e-posta ile kullanıcı yok:', em);
  process.exit(1);
}
console.log('Admin e-posta:', em);
console.log('Yeni şifre:', plain);

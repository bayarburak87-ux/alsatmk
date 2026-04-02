/**
 * Admin kullanıcıyı oluşturur veya şifresini günceller (info@alsatmk.com — ADMIN_EMAIL ile değişir).
 *
 * Kullanım:
 *   node scripts/ensure-admin.js [şifre]
 *
 * Şifre verilmezse: ortam değişkeni ADMIN_BOOTSTRAP_PASSWORD, yoksa rastgele güçlü şifre üretilir (konsola yazılır).
 *
 * Postgres (Railway):
 *   DATABASE_URL="postgresql://..." node scripts/ensure-admin.js BenimSifrem123
 */
require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });
const path = require('path');
const crypto = require('crypto');
const config = require('../config');
const { hashPassword } = require('../security');

const em = (config.admin.email || 'info@alsatmk.com').toLowerCase().trim();
const plain =
  (process.argv[2] && String(process.argv[2]).trim()) ||
  (process.env.ADMIN_BOOTSTRAP_PASSWORD && String(process.env.ADMIN_BOOTSTRAP_PASSWORD).trim()) ||
  'Alsat-' + crypto.randomBytes(10).toString('base64url').replace(/=/g, '');

if (plain.length < 6) {
  console.error('Şifre en az 6 karakter olmalı.');
  process.exit(1);
}

const hash = hashPassword(plain);
const driver = config.db.driver;

async function main() {
  if (driver === 'postgres') {
    if (!process.env.DATABASE_URL) {
      console.error('DATABASE_URL tanımlı değil (Postgres).');
      process.exit(1);
    }
    const { Pool } = require('pg');
    const pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: /railway\.app|rlwy\.net/i.test(process.env.DATABASE_URL || '')
        ? { rejectUnauthorized: false }
        : undefined
    });
    try {
      const up = await pool.query(
        'UPDATE users SET password_hash = $1, name = COALESCE(NULLIF(TRIM(name), \'\'), $3) WHERE LOWER(TRIM(email)) = $2',
        [hash, em, 'Admin']
      );
      if (up.rowCount === 0) {
        await pool.query(
          'INSERT INTO users (email, name, password_hash, banned) VALUES ($1, $2, $3, false)',
          [em, 'Admin', hash]
        );
        console.log('Yeni admin kullanıcı oluşturuldu.');
      } else {
        console.log('Admin şifresi (ve gerekirse isim) güncellendi.');
      }
    } finally {
      await pool.end();
    }
  } else if (driver === 'mysql') {
    if (!process.env.DATABASE_URL) {
      console.error('DATABASE_URL tanımlı değil (MySQL).');
      process.exit(1);
    }
    const mysql = require('mysql2/promise');
    const conn = await mysql.createConnection(process.env.DATABASE_URL);
    try {
      const [result] = await conn.execute(
        'UPDATE users SET password_hash = ?, name = IF(name IS NULL OR TRIM(name) = \'\', ?, name) WHERE LOWER(TRIM(email)) = ?',
        [hash, 'Admin', em]
      );
      if (result.affectedRows === 0) {
        await conn.execute('INSERT INTO users (email, name, password_hash, banned) VALUES (?, ?, ?, 0)', [em, 'Admin', hash]);
        console.log('Yeni admin kullanıcı oluşturuldu.');
      } else {
        console.log('Admin şifresi güncellendi.');
      }
    } finally {
      await conn.end();
    }
  } else {
    const Database = require('better-sqlite3');
    const dbPath = path.join(__dirname, '..', 'alsat.db');
    const sqlite = new Database(dbPath);
    const r = sqlite
      .prepare(
        'UPDATE users SET password_hash = ?, name = CASE WHEN name IS NULL OR TRIM(name) = \'\' THEN ? ELSE name END WHERE LOWER(TRIM(email)) = ?'
      )
      .run(hash, 'Admin', em);
    if (r.changes === 0) {
      sqlite.prepare('INSERT INTO users (email, name, password_hash, banned) VALUES (?, ?, ?, 0)').run(em, 'Admin', hash);
      console.log('Yeni admin kullanıcı oluşturuldu.');
    } else {
      console.log('Admin şifresi güncellendi.');
    }
    sqlite.close();
  }

  console.log('');
  console.log('Giriş bilgileri:');
  console.log('  E-posta:', em);
  console.log('  Şifre:  ', plain);
  console.log('');
  console.log('Bu şifreyi güvenli yerde saklayın; üretimde ADMIN_BOOTSTRAP_PASSWORD ile tekrar çalıştırmayın.');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

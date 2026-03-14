/**
 * Veritabanı şemasını oluşturur
 * Kullanım: DB_DRIVER=postgres npm run db:init
 */
require('dotenv').config();
const fs = require('fs');
const path = require('path');

const driver = process.env.DB_DRIVER || 'sqlite';

async function init() {
  if (driver === 'postgres') {
    const { Pool } = require('pg');
    const pool = new Pool({ connectionString: process.env.DATABASE_URL });
    const sql = fs.readFileSync(path.join(__dirname, 'schema-postgres.sql'), 'utf8');
    await pool.query(sql);
    console.log('PostgreSQL şeması oluşturuldu.');
    await pool.end();
  } else if (driver === 'mysql') {
    const mysql = require('mysql2/promise');
    const conn = await mysql.createConnection(process.env.DATABASE_URL || 'mysql://root@localhost:3306');
    const sql = fs.readFileSync(path.join(__dirname, 'schema-mysql.sql'), 'utf8');
    await conn.query('CREATE DATABASE IF NOT EXISTS alsat');
    await conn.query('USE alsat');
    const stmts = sql.split(';').map(s => s.trim()).filter(Boolean);
    for (const stmt of stmts) await conn.query(stmt);
    console.log('MySQL şeması oluşturuldu.');
    await conn.end();
  } else {
    const Database = require('better-sqlite3');
    const db = new Database(path.join(__dirname, '..', 'alsat.db'));
    db.exec(`
      CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT UNIQUE, name TEXT, password_hash TEXT, phone TEXT, banned INTEGER DEFAULT 0, created_at TEXT);
      CREATE TABLE IF NOT EXISTS ads (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER, title TEXT, price REAL, currency TEXT, category TEXT, sub_category TEXT, city TEXT, district TEXT, description TEXT, images TEXT, video TEXT, attrs TEXT, condition TEXT, seller_type TEXT, status TEXT DEFAULT 'approved', views INTEGER DEFAULT 0, clicks INTEGER DEFAULT 0, fav_count INTEGER DEFAULT 0, accept_trade INTEGER DEFAULT 0, price_history TEXT, sold_at TEXT, created_at TEXT, expiry_at TEXT, featured INTEGER DEFAULT 0, urgent INTEGER DEFAULT 0);
      CREATE TABLE IF NOT EXISTS favorites (user_id INTEGER, ad_id INTEGER, PRIMARY KEY(user_id, ad_id));
    `);
    console.log('SQLite şeması oluşturuldu.');
    db.close();
  }
}

init().catch(e => { console.error(e); process.exit(1); });

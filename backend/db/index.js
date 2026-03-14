/**
 * Veritabanı adaptörü - PostgreSQL, MySQL veya SQLite
 * DB_DRIVER=postgres | mysql | sqlite
 */
require('dotenv').config();
const driver = process.env.DB_DRIVER || 'sqlite';

let db;

if (driver === 'postgres') {
  const { Pool } = require('pg');
  db = new Pool({ connectionString: process.env.DATABASE_URL });
  db.queryAsync = (sql, params) => db.query(sql, params || []).then(r => r.rows);
  db.getAsync = (sql, params) => db.query(sql, params || []).then(r => r.rows[0] || null);
  db.runAsync = (sql, params) =>
    db.query(sql, params || []).then(r => {
      const row = r.rows && r.rows[0];
      return { insertId: row ? row.id : null, insert_id: row ? row.id : null };
    });
} else if (driver === 'mysql') {
  const mysql = require('mysql2/promise');
  const conn = mysql.createPool(process.env.DATABASE_URL || 'mysql://root@localhost:3306/alsat');
  db = {
    queryAsync: (sql, params) => conn.execute(sql, params || []).then(([rows]) => rows),
    getAsync: (sql, params) => conn.execute(sql, params || []).then(([rows]) => rows[0] || null),
    runAsync: (sql, params) => conn.execute(sql, params || []).then(([r]) => ({ insertId: r.insertId, insert_id: r.insertId }))
  };
} else {
  const Database = require('better-sqlite3');
  const path = require('path');
  const sqlite = new Database(path.join(__dirname, '..', 'alsat.db'));
  db = {
    queryAsync: (sql, params) => Promise.resolve(sqlite.prepare(sql).all(...(params || []))),
    getAsync: (sql, params) => Promise.resolve(sqlite.prepare(sql).get(...(params || []))),
    runAsync: (sql, params) => {
      const r = sqlite.prepare(sql).run(...(params || []));
      return Promise.resolve({ insertId: r.lastInsertRowid, insert_id: r.lastInsertRowid });
    }
  };
}

module.exports = db;

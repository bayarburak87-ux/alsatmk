-- Alsat PostgreSQL Şeması
-- Çalıştırma: psql -U postgres -d alsat -f schema-postgres.sql

CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE,
  name VARCHAR(255),
  password_hash VARCHAR(255),
  phone VARCHAR(50),
  banned BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS ads (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  title VARCHAR(500) NOT NULL,
  price DECIMAL(12,2),
  currency VARCHAR(10) DEFAULT 'EUR',
  category VARCHAR(100),
  sub_category VARCHAR(100),
  city VARCHAR(100),
  district VARCHAR(100),
  description TEXT,
  images JSONB,
  video TEXT,
  attrs JSONB,
  condition VARCHAR(50),
  seller_type VARCHAR(50),
  status VARCHAR(20) DEFAULT 'approved',
  views INTEGER DEFAULT 0,
  clicks INTEGER DEFAULT 0,
  fav_count INTEGER DEFAULT 0,
  accept_trade BOOLEAN DEFAULT false,
  price_history JSONB,
  sold_at TIMESTAMP,
  created_at TIMESTAMP,
  expiry_at TIMESTAMP,
  featured BOOLEAN DEFAULT false,
  urgent BOOLEAN DEFAULT false
);

CREATE INDEX idx_ads_status ON ads(status);
CREATE INDEX idx_ads_category ON ads(category);
CREATE INDEX idx_ads_city ON ads(city);
CREATE INDEX idx_ads_created ON ads(created_at);
CREATE INDEX idx_ads_title_search ON ads USING GIN(to_tsvector('turkish', title));

CREATE TABLE IF NOT EXISTS favorites (
  user_id INTEGER,
  ad_id INTEGER,
  PRIMARY KEY (user_id, ad_id),
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (ad_id) REFERENCES ads(id)
);

CREATE TABLE IF NOT EXISTS conversations (
  id SERIAL PRIMARY KEY,
  ad_id INTEGER REFERENCES ads(id),
  seller_id INTEGER REFERENCES users(id),
  buyer_id INTEGER REFERENCES users(id),
  seller_confirmed BOOLEAN DEFAULT false,
  buyer_confirmed BOOLEAN DEFAULT false,
  rated BOOLEAN DEFAULT false,
  last_msg_time BIGINT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS messages (
  id SERIAL PRIMARY KEY,
  conversation_id INTEGER REFERENCES conversations(id),
  from_user_id INTEGER REFERENCES users(id),
  text TEXT,
  time BIGINT
);

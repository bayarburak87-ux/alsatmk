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
  time BIGINT,
  read_at BIGINT
);

-- Mevcut veritabanları için read_at sütunu ekle
DO $$ BEGIN
  ALTER TABLE messages ADD COLUMN read_at BIGINT;
EXCEPTION WHEN duplicate_column THEN NULL;
END $$;

CREATE TABLE IF NOT EXISTS ad_reports (
  id SERIAL PRIMARY KEY,
  ad_id INTEGER,
  user_id INTEGER,
  reason VARCHAR(200),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS search_alerts (
  id SERIAL PRIMARY KEY,
  user_id INTEGER,
  query VARCHAR(500),
  filters JSONB,
  email VARCHAR(255),
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Fiyat takibi (favori ilanlar için fiyat düşünce bildirim)
CREATE TABLE IF NOT EXISTS price_alerts (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  ad_id INTEGER REFERENCES ads(id),
  price_at_subscribe DECIMAL(12,2),
  ad_title VARCHAR(500),
  notified BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, ad_id)
);

-- İlan taslakları
CREATE TABLE IF NOT EXISTS ad_drafts (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  data JSONB NOT NULL,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Kullanıcı puanlamaları (satış sonrası)
CREATE TABLE IF NOT EXISTS user_ratings (
  id SERIAL PRIMARY KEY,
  from_user_id INTEGER REFERENCES users(id),
  to_user_id INTEGER REFERENCES users(id),
  ad_id INTEGER REFERENCES ads(id),
  conversation_id INTEGER REFERENCES conversations(id),
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Popüler aramalar
CREATE TABLE IF NOT EXISTS popular_searches (
  id SERIAL PRIMARY KEY,
  query VARCHAR(255) NOT NULL,
  hit_count INTEGER DEFAULT 1,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_popular_searches_hit ON popular_searches(hit_count DESC);

-- Telefon görüntüleme (opsiyonel istatistik)
CREATE TABLE IF NOT EXISTS phone_views (
  id SERIAL PRIMARY KEY,
  ad_id INTEGER,
  user_id INTEGER,
  viewed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Ads tablosuna hide_phone ekle (PostgreSQL 9.6+)
DO $$ BEGIN
  ALTER TABLE ads ADD COLUMN hide_phone BOOLEAN DEFAULT false;
EXCEPTION WHEN duplicate_column THEN NULL;
END $$;

-- Aktif oturumlar (online kullanıcı takibi - opsiyonel log)
CREATE TABLE IF NOT EXISTS active_sessions (
  id SERIAL PRIMARY KEY,
  session_key VARCHAR(100) UNIQUE,
  user_id INTEGER,
  ip VARCHAR(50),
  user_agent TEXT,
  last_activity TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_active_sessions_last ON active_sessions(last_activity);

-- Web Push abonelikleri
CREATE TABLE IF NOT EXISTS web_push_subscriptions (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  endpoint TEXT NOT NULL,
  p256dh TEXT,
  auth TEXT,
  user_agent TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_web_push_user ON web_push_subscriptions(user_id);

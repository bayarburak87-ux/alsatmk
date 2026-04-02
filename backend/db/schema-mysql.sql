-- Alsat MySQL Şeması
-- Çalıştırma: mysql -u root -p alsat < schema-mysql.sql

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) UNIQUE,
  name VARCHAR(255),
  password_hash VARCHAR(255),
  phone VARCHAR(50),
  banned TINYINT(1) DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS ads (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  title VARCHAR(500) NOT NULL,
  price DECIMAL(12,2),
  currency VARCHAR(10) DEFAULT 'EUR',
  category VARCHAR(100),
  sub_category VARCHAR(100),
  city VARCHAR(100),
  district VARCHAR(100),
  description TEXT,
  images JSON,
  video TEXT,
  attrs JSON,
  `condition` VARCHAR(50),
  seller_type VARCHAR(50),
  status VARCHAR(20) DEFAULT 'approved',
  views INT DEFAULT 0,
  clicks INT DEFAULT 0,
  fav_count INT DEFAULT 0,
  accept_trade TINYINT(1) DEFAULT 0,
  price_history JSON,
  sold_at TIMESTAMP NULL,
  created_at TIMESTAMP NULL,
  expiry_at TIMESTAMP NULL,
  featured TINYINT(1) DEFAULT 0,
  urgent TINYINT(1) DEFAULT 0,
  hide_phone TINYINT(1) DEFAULT 0,
  FOREIGN KEY (user_id) REFERENCES users(id),
  INDEX idx_status (status),
  INDEX idx_category (category),
  INDEX idx_city (city),
  FULLTEXT idx_title (title)
);

CREATE TABLE IF NOT EXISTS favorites (
  user_id INT,
  ad_id INT,
  PRIMARY KEY (user_id, ad_id),
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (ad_id) REFERENCES ads(id)
);

CREATE TABLE IF NOT EXISTS ad_reports (
  id INT AUTO_INCREMENT PRIMARY KEY,
  ad_id INT,
  user_id INT,
  reason VARCHAR(200),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS search_alerts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  query VARCHAR(500),
  filters JSON,
  email VARCHAR(255),
  active TINYINT(1) DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS conversations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  ad_id INT,
  seller_id INT,
  buyer_id INT,
  seller_confirmed TINYINT(1) DEFAULT 0,
  buyer_confirmed TINYINT(1) DEFAULT 0,
  rated TINYINT(1) DEFAULT 0,
  last_msg_time BIGINT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (ad_id) REFERENCES ads(id),
  FOREIGN KEY (seller_id) REFERENCES users(id),
  FOREIGN KEY (buyer_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS messages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  conversation_id INT,
  from_user_id INT,
  text TEXT,
  time BIGINT,
  read_at BIGINT,
  FOREIGN KEY (conversation_id) REFERENCES conversations(id),
  FOREIGN KEY (from_user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS price_alerts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  ad_id INT,
  price_at_subscribe DECIMAL(12,2),
  ad_title VARCHAR(500),
  notified TINYINT(1) DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY uk_price_alert (user_id, ad_id),
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (ad_id) REFERENCES ads(id)
);

CREATE TABLE IF NOT EXISTS ad_drafts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  data JSON NOT NULL,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS user_ratings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  from_user_id INT,
  to_user_id INT,
  ad_id INT,
  conversation_id INT,
  rating INT CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (from_user_id) REFERENCES users(id),
  FOREIGN KEY (to_user_id) REFERENCES users(id),
  FOREIGN KEY (ad_id) REFERENCES ads(id),
  FOREIGN KEY (conversation_id) REFERENCES conversations(id)
);

CREATE TABLE IF NOT EXISTS popular_searches (
  id INT AUTO_INCREMENT PRIMARY KEY,
  query VARCHAR(255) NOT NULL,
  hit_count INT DEFAULT 1,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS phone_views (
  id INT AUTO_INCREMENT PRIMARY KEY,
  ad_id INT,
  user_id INT,
  viewed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (ad_id) REFERENCES ads(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS active_sessions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  session_key VARCHAR(100) UNIQUE,
  user_id INT,
  ip VARCHAR(50),
  user_agent TEXT,
  last_activity TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS web_push_subscriptions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  endpoint TEXT NOT NULL,
  p256dh TEXT,
  auth TEXT,
  user_agent TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  INDEX idx_web_push_user (user_id)
);

CREATE TABLE IF NOT EXISTS site_settings (
  id INT PRIMARY KEY,
  data JSON NOT NULL,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Mevcut veritabanı için: ALTER TABLE ads ADD COLUMN hide_phone TINYINT(1) DEFAULT 0;

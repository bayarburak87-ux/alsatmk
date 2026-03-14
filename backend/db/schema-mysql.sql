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

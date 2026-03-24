# Alsat – reCAPTCHA & Web Push Kurulumu

## 1. Backend Bağımlılıkları

```bash
cd backend
npm install
```

## 2. VAPID Anahtarları (Web Push)

```bash
cd backend
npm run vapid:generate
```

Çıktı örneği:
```
VAPID_PUBLIC_KEY=BNx...
VAPID_PRIVATE_KEY=...
```

Bu satırları `.env` dosyasına ekleyin.

## 3. reCAPTCHA v3 Anahtarları

1. [Google reCAPTCHA Admin](https://www.google.com/recaptcha/admin) adresine gidin
2. Yeni site ekleyin, v3 seçin
3. Domain'leri ekleyin (`localhost` test için)
4. Site Key ve Secret Key'i alın

## 4. `.env` Dosyası

`backend/.env.example` dosyasını `.env` olarak kopyalayın:

```bash
cd backend
copy .env.example .env   # Windows
# veya: cp .env.example .env   # Linux/Mac
```

`.env` içinde şunları ayarlayın:

```env
# reCAPTCHA v3
RECAPTCHA_SITE_KEY=6Lc...
RECAPTCHA_SECRET_KEY=6Lc...

# Web Push (vapid:generate çıktısı)
VAPID_PUBLIC_KEY=BNx...
VAPID_PRIVATE_KEY=...
```

## 5. Veritabanı (PostgreSQL)

PostgreSQL kullanıyorsanız, yeni tabloları ekleyin:

```bash
psql -U postgres -d alsat -f backend/db/schema-postgres.sql
```

Veya sadece `web_push_subscriptions` tablosu:

```sql
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
```

## 6. Çalıştırma

```bash
cd backend
npm start
```

Frontend `http://localhost:3001` üzerinden otomatik olarak `/api/config` çağrısı yaparak reCAPTCHA ve VAPID anahtarlarını alır.

---

**Not:** reCAPTCHA ve VAPID anahtarları tanımlanmazsa ilgili özellikler devre dışı kalır; uygulama çalışmaya devam eder.

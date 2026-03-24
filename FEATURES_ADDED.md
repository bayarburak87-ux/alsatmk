# Eklenen Özellikler

## Backend (API)
- **Fiyat Takibi** – `GET/POST/DELETE /api/price-alerts`
- **İlan Taslakları** – `GET/POST/PUT/DELETE /api/drafts`
- **Kullanıcı Puanlamaları** – `POST /api/ratings`, `GET /api/users/:id/ratings`
- **Popüler Aramalar** – `GET/POST /api/popular-searches`
- **Telefon Görüntüleme** – `POST /api/ads/:id/phone-view` (istatistik)
- **Fiyat Düşüş Cron** – `node backend/jobs/price-alert-cron.js`

## Frontend
- **Taslak Kaydet** – İlan formunda "Taslak Kaydet" butonu
- **Telefon Gizleme** – İlan verirken "Telefonu gizle" seçeneği; detayda "Numarayı Göster"
- **Sosyal Paylaşım** – Facebook, X (Twitter), WhatsApp, QR Kod, Link Kopyala
- **Popüler Aramalar** – Arama çubuğunda API'den gelen popüler aramalar
- **Karşılaştırma** – Zaten vardı (compare list)
- **PWA** – `sw.js` Service Worker (offline cache)
- **SEO** – İlan detayı açıldığında dinamik meta etiketleri

## Veritabanı
- `price_alerts` – Fiyat takibi
- `ad_drafts` – Taslaklar
- `user_ratings` – Satıcı puanlamaları
- `popular_searches` – Popüler aramalar
- `phone_views` – Telefon görüntüleme
- `ads.hide_phone` – Telefon gizleme

## Kurulum
```bash
# PostgreSQL için yeni tablolar
psql -U postgres -d alsat -f backend/db/schema-postgres.sql

# Fiyat düşüş cron (her saat)
node backend/jobs/price-alert-cron.js
```

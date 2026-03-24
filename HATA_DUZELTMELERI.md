# Alsat – Taranan Hatalar ve Düzeltmeler

## Yapılan Düzeltmeler

### 1. PostgreSQL `insertId` (Kritik)
**Sorun:** PostgreSQL INSERT sorguları `RETURNING id` olmadan çalışıyordu; `insertId` her zaman `null` dönüyordu.

**Çözüm:** `insertReturningId()` helper eklendi. Aşağıdaki endpoint'ler güncellendi:
- `POST /api/auth/register`
- `POST /api/auth/verify-register`
- `POST /api/drafts`
- `POST /api/conversations`
- `POST /api/conversations/:id/messages`
- `POST /api/search-alerts`

### 2. MySQL Şeması Eksik Tablolar (Kritik)
**Sorun:** MySQL şemasında `conversations`, `messages`, `price_alerts`, `ad_drafts`, `user_ratings`, `popular_searches`, `phone_views`, `active_sessions` tabloları yoktu. `ads` tablosunda `hide_phone` sütunu eksikti.

**Çözüm:** `schema-mysql.sql` bu tablolar ve `hide_phone` ile güncellendi.

### 3. SQLite init.js Eksik Tablolar
**Sorun:** `npm run db:init` (SQLite) sadece `users`, `ads`, `favorites` oluşturuyordu.

**Çözüm:** `db/init.js` tüm tabloları oluşturacak şekilde `server.js` ile hizalandı.

### 4. API İstemcisi (api.js)
- **removeFavorite:** 4xx/5xx cevapları kontrol ediliyor, hata durumunda `throw` ile haber veriliyor.
- **updateDraft, deleteDraft:** Eksik metodlar eklendi.
- **price-alert-cron:** `npm run cron:price-alerts` script'i eklendi.

---

## Bilinen / Değiştirilmeyen Durumlar

| Konu | Açıklama |
|------|----------|
| **JWT_SECRET** | Production'da `.env` içinde mutlaka tanımlanmalı. Varsayılan değer sadece development içindir. |
| **ADMIN_RESET_TOKEN** | Production'da boş bırakılmamalı; aksi halde reset endpoint'i token istemeden çalışır. |
| **Currency varsayılanı** | Backend `MKD`, frontend `EUR` kullanıyor; bu bilinçli bir tercih (Makedonya odaklı platform). |
| **redis.js** | Kullanılmıyor; `ioredis` package.json'da yok. Redis kullanılacaksa paket eklenmeli. |
| **video alanı** | `ads` tablosunda var ama INSERT/UPDATE'te kullanılmıyor; ileride eklenebilir. |

---

## Önerilen Sonraki Adımlar

1. **Production öncesi:** `JWT_SECRET` ve `ADMIN_RESET_TOKEN` mutlaka `.env` içinde ayarlayın.
2. **MySQL kullanıyorsanız:** `schema-mysql.sql` değişikliklerini uygulayın. Mevcut veritabanında `hide_phone` yoksa:
   ```sql
   ALTER TABLE ads ADD COLUMN hide_phone TINYINT(1) DEFAULT 0;
   ```
3. **Cron job'lar:** Fiyat düşüşü bildirimi için:
   ```bash
   npm run cron:price-alerts
   ```

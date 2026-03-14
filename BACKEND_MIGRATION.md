# Alsat → Gerçek Backend Geçiş Planı

Bu doküman, mevcut localStorage tabanlı Alsat uygulamasını **gerçek bir Sahibinden tarzı full-stack** yapıya taşımak için gereken adımları açıklar.

---

## Mevcut Durum
- **Frontend**: Vanilla JS, HTML, CSS
- **Veri**: Tüm veriler tarayıcı `localStorage`'da (client-side only)
- **Sınırlamalar**: Veriler cihaza özel, sunucuda saklanmıyor, ölçeklenebilir değil

---

## Önerilen Teknoloji Seçimi

### Backend: **Node.js + Express**
- Avantaj: Frontend zaten JavaScript; aynı dilde tutarlılık
- RESTful API kolay kurulur
- Alternatifler: **Python (Flask/FastAPI)**, **PHP (Laravel)** – hepsi uygun

### Veritabanı: **PostgreSQL** veya **MongoDB**
| | PostgreSQL | MongoDB |
|---|---|---|
| **İlişkisel veri** | ✅ İlan–kullanıcı–kategori ilişkileri | ✅ Doküman tabanlı, esnek şema |
| **Arama** | ✅ Full-text search | ✅ Text index |
| **Ölçeklilik** | İyi | Çok iyi |
| **Öğrenme** | SQL bilgisi gerekir | JSON benzeri, JS ile uyumlu |

**Öneri**: İlan platformu için **PostgreSQL** (ilişkisel yapı ve güçlü arama için)

---

## Gerekli API Endpoint'leri

```
POST   /api/auth/register      - Kayıt
POST   /api/auth/login         - Giriş
GET    /api/ads                - İlan listesi (filtre, sayfalama)
POST   /api/ads                - İlan ekle
GET    /api/ads/:id            - İlan detay
PUT    /api/ads/:id            - İlan güncelle
DELETE /api/ads/:id            - İlan sil
GET    /api/users/:id          - Kullanıcı profil
POST   /api/favorites          - Favori ekle/çıkar
POST   /api/messages           - Mesaj gönder
GET    /api/conversations      - Konuşmalar
... (tüm mevcut localStorage verileri için benzer endpoint'ler)
```

---

## Geçiş Adımları

### Aşama 1: Backend + DB Kurulumu
1. Node.js + Express API
2. PostgreSQL veya MongoDB bağlantısı
3. Temel tablolar (users, ads, categories, favorites, conversations...)

### Aşama 2: Auth Sistemi
- JWT token tabanlı giriş
- Şifre hash (bcrypt)
- Session yönetimi

### Aşama 3: API Entegrasyonu
- Frontend’de `localStorage` yerine `fetch()` ile API çağrıları
- Mevcut fonksiyonları (örn: `loadAdsDatabase` → `fetch('/api/ads')`) API’ye yönlendir

### Aşama 4: Dosya Yükleme
- Fotoğraf/video için cloud storage (Cloudinary, AWS S3, vs.)
- API’ye dosya yükleme endpoint’i

### Aşama 5: Bildirimler & Zamanlı İşler
- E-posta bildirimleri
- Arama kayıtları için cron/queue

---

## Hızlı Başlangıç (Node.js + Express + SQLite/PostgreSQL)

`/backend` klasöründe minimal bir API örneği bulabilirsin. Başlamak için:

```bash
cd backend
npm install
npm run dev
```

---

## Karşılaştırma Özeti

| Özellik | Python | Node.js | PHP |
|---------|--------|---------|-----|
| JS ile uyum | Orta | ⭐ Yüksek | Orta |
| Hız | İyi | İyi | İyi |
| Hosting | Heroku, Railway | Vercel, Railway | cPanel, Shared |
| Öğrenme eğrisi | Orta | Düşük (JS biliyorsan) | Orta |

| Veritabanı | Avantaj |
|------------|---------|
| **MySQL** | Yaygın, ucuz hosting |
| **PostgreSQL** | Güçlü özellikler, full-text search |
| **MongoDB** | Esnek şema, JSON uyumlu |

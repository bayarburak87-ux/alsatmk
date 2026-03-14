# Alsat Backend API

Minimal Node.js + Express + SQLite API. Gerçek production için PostgreSQL/MongoDB ve JWT auth eklenmeli.

## Kurulum

```bash
npm install
npm run dev
```

API: http://localhost:3001

## Endpoint'ler

- `GET /api/ads` - İlan listesi (?category, ?city, ?search)
- `GET /api/ads/:id` - İlan detay
- `POST /api/ads` - Yeni ilan
- `GET /api/users/:id` - Kullanıcı
- `POST /api/users` - Kayıt
- `GET /api/favorites/:userId` - Favori ilan ID'leri
- `POST /api/favorites` - Favori ekle
- `DELETE /api/favorites/:userId/:adId` - Favoriden çıkar

## Frontend Entegrasyonu

`script.js` içinde `loadAdsDatabase` gibi fonksiyonları API çağrılarına çevirin:

```javascript
// Eski (localStorage)
const ads = JSON.parse(localStorage.getItem('adsDatabase') || '[]');

// Yeni (API)
const res = await fetch('http://localhost:3001/api/ads');
const ads = await res.json();
```

## PostgreSQL'e Geçiş

1. `pg` paketini kurun: `npm i pg`
2. `server.js` içinde SQLite yerine `pg` kullanın
3. Tabloları PostgreSQL'e uyarlayın (AUTOINCREMENT → SERIAL, vb.)

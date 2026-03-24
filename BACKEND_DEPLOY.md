# Backend Deploy Rehberi (Railway / Render)

**Önemli:** Vercel sadece frontend (HTML, CSS, JS) sunar. Backend (giriş, şifre sıfırlama, API) ayrı bir serviste çalışmalı.

Bu rehber, backend'i **Railway** veya **Render** üzerinde ücretsiz deploy etmek içindir.

---

## Adım 1: Railway ile Deploy (Önerilen)

### 1.1 Railway'e giriş

1. [railway.app](https://railway.app) adresine git
2. **Login with GitHub** ile GitHub hesabına bağlan
3. **New Project** tıkla

### 1.2 Projeyi GitHub'dan bağla

1. **Deploy from GitHub repo** seç
2. `bayarburak87-ux/alsat` (veya reponun adı) repo'sunu seç
3. **Configure** tıkla

### 1.3 Root Directory ayarla

1. Proje ayarlarına gir (**Settings** veya sağ taraftaki **⚙️**)
2. **Root Directory** kısmına `backend` yaz (sadece backend klasörü deploy edilecek)
3. Kaydet

### 1.4 Environment Variables ekle

1. **Variables** sekmesine git
2. Aşağıdaki değişkenleri ekle (RAW Editor ile tek seferde yapıştırabilirsin):

```
PORT=3001
NODE_ENV=production
DB_DRIVER=sqlite
ADMIN_EMAIL=info@alsatmk.com
SITE_URL=https://www.alsatmk.com
JWT_SECRET=buraya-32-karakter-rastgele-bir-sifre-yaz
CORS_ORIGINS=https://www.alsatmk.com,https://alsatmk.com,https://alsatmk.vercel.app

SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=info@alsatmk.com
SMTP_PASS=xwpf xarr ksig eedg
MAIL_FROM="Alsat" <info@alsatmk.com>
```

> **JWT_SECRET:** `openssl rand -hex 32` ile üretebilir veya rastgele 32+ karakter yaz.

### 1.5 Deploy URL'ini al

1. **Settings** → **Networking** → **Generate Domain** tıkla
2. Örnek URL: `https://alsat-api-production-xxxx.up.railway.app`
3. Bu URL'i kopyala

---

## Adım 2: Frontend'i Backend'e bağla

### 2.1 index.html'i güncelle

`index.html` dosyasında şu satırı bul:

```html
<!-- <script>window.ALSAT_API_URL='https://alsat-api.up.railway.app';</script> -->
```

Yorum işaretlerini kaldır ve Railway'den aldığın URL'i yaz:

```html
<script>window.ALSAT_API_URL='https://SENIN-RAILWAY-URL.up.railway.app';</script>
```

### 2.2 Git'e push et

```bash
git add index.html
git commit -m "Backend API URL eklendi"
git push
```

Vercel otomatik deploy alacak. Birkaç dakika bekle.

---

## Adım 3: Test

1. **www.alsatmk.com** adresine git
2. **Şifremi Unuttum** tıkla
3. E-posta girip **KOD GÖNDER** bas
4. E-posta gelmeli (spam klasörünü kontrol et)

---

## Alternatif: Render ile Deploy

1. [render.com](https://render.com) → **Sign Up** → GitHub ile giriş
2. **New** → **Web Service**
3. Repo'yu seç (`alsat`)
4. Ayarlar:
   - **Root Directory:** `backend`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Instance Type:** Free
5. **Environment** sekmesinde aynı değişkenleri ekle (Railway'deki gibi)
6. **Create Web Service**
7. URL'i kopyala (örn. `https://alsat-api.onrender.com`)
8. `index.html`'de `ALSAT_API_URL` olarak bu URL'i kullan

> **Not:** Render free tier 15 dakika hareketsizlikten sonra uyur; ilk istek ~1 dakika sürebilir.

---

## Sorun Giderme

| Sorun | Çözüm |
|-------|-------|
| "CORS hatası" | Railway/Render'da `CORS_ORIGINS` içine `https://www.alsatmk.com` eklediğinden emin ol |
| "Kod gönderilemedi" | `.env`'de `SMTP_PASS` doğru mu? Gmail uygulama şifresi kullan |
| "Bu e-posta kayıtlı değil" | Önce siteye kayıt ol, sonra şifre sıfırla |
| 404 / Bağlantı hatası | `ALSAT_API_URL` doğru yazıldı mı? Sonunda `/` olmamalı |

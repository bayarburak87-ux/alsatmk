# Alsat – www.alsatmk.com Yayınlama Kılavuzu

Bu rehber, projeyi **www.alsatmk.com** adresinde yayınlamak için gereken adımları içerir.

---

## Gereksinimler

- **Sunucu:** Linux VPS (Ubuntu 20.04+ önerilir) – DigitalOcean, Hetzner, Linode vb.
- **Domain:** alsatmk.com, www.alsatmk.com sunucu IP’sine yönlendirilmiş olmalı
- **Node.js:** 18+

---

## 1. Sunucuya Bağlanma

```bash
ssh root@SUNUCU_IP
```

---

## 2. Node.js Kurulumu

```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs
node -v   # v18.x görmelisiniz
```

---

## 3. Projeyi Sunucuya Yükleme

**Seçenek A – Git ile:**
```bash
cd /var/www
git clone REPO_URL alsat
cd alsat
```

**Seçenek B – FTP/SFTP ile:**
- Tüm proje dosyalarını `/var/www/alsat` klasörüne yükleyin
- `backend/node_modules` yüklemeyin, sunucuda `npm install` yapılacak

---

## 4. Backend Kurulumu

```bash
cd /var/www/alsat/backend
npm install
```

`.env` dosyasını oluşturun:

```bash
nano .env
```

Aşağıdaki içeriği yazın (değerleri kendinize göre güncelleyin):

```env
PORT=3001
NODE_ENV=production
DB_DRIVER=sqlite
ADMIN_EMAIL=info@alsatmk.com
SITE_URL=https://www.alsatmk.com

# JWT – mutlaka güçlü bir anahtar kullanın (ör: openssl rand -hex 32)
JWT_SECRET=BURAYA_RANDOM_32_KARAKTER_YAZIN
JWT_EXPIRES=7d

# CORS – site adresleri
CORS_ORIGINS=https://alsatmk.com,https://www.alsatmk.com

# E-posta (şifre sıfırlama)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=info@alsatmk.com
SMTP_PASS=uygulama_sifreniz
MAIL_FROM="Alsat" <info@alsatmk.com>

# reCAPTCHA v3 (www.alsatmk.com domain’ini ekleyin)
RECAPTCHA_SITE_KEY=...
RECAPTCHA_SECRET_KEY=...
```

---

## 5. PM2 ile Sürekli Çalıştırma

```bash
sudo npm install -g pm2
cd /var/www/alsat/backend
pm2 start server.js --name alsat
pm2 save
pm2 startup   # Sunucu açılışında otomatik başlatma
```

---

## 6. Nginx + SSL (Let's Encrypt)

```bash
sudo apt install -y nginx certbot python3-certbot-nginx
```

Nginx sitesi oluşturun:

```bash
sudo nano /etc/nginx/sites-available/alsatmk
```

İçerik:

```nginx
server {
    listen 80;
    server_name alsatmk.com www.alsatmk.com;
    
    location / {
        proxy_pass http://127.0.0.1:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Aktif edin:

```bash
sudo ln -s /etc/nginx/sites-available/alsatmk /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

SSL ekleyin (ücretsiz):

```bash
sudo certbot --nginx -d alsatmk.com -d www.alsatmk.com
```

---

## 7. Tamamlandı

Site **https://www.alsatmk.com** adresinde çalışır.

- **Giriş:** info@alsatmk.com / alsat123 (veya şifre sıfırlama ile belirlediğiniz şifre)
- **Admin:** Giriş yaptıktan sonra Profil menüsünden veya `?admin=1` ile

---

## Güncelleme

```bash
cd /var/www/alsat
git pull
cd backend && npm install
pm2 restart alsat
```

---

## Önemli Notlar

1. **JWT_SECRET:** Production ortamında mutlaka güçlü, rastgele bir değer kullanın.
2. **SQLite:** Küçük trafik için uygundur. Yük arttıkça PostgreSQL kullanmayı düşünün.
3. **Yedekleme:** `backend/alsat.db` dosyasını düzenli olarak yedekleyin.
4. **Firewall:** Gerekirse `ufw allow 80`, `ufw allow 443`, `ufw enable` ile sadece HTTP/HTTPS’e izin verin.

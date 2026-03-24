# Alsat - Eklenen ve Planlanan Özellikler

## ✅ EKLENDİ: Online Kullanıcı Takibi

- **Backend**: Her API isteğinde IP, User-Agent, User ID (giriş yaptıysa) kaydedilir
- **Süre**: Son 5 dakikada aktivite gösterenler "online" sayılır
- **Admin Panel** → **Online** sekmesi:
  - Toplam oturum sayısı
  - Farklı IP sayısı
  - Tablo: IP, Tarayıcı/Cihaz, Kullanıcı ID (veya Misafir), Son Aktivite
- **Ping**: Frontend her 45 saniyede bir `/api/ping` çağırır (API bağlıysa)
- **Admin Token**: `ADMIN_RESET_TOKEN` .env'de tanımlıysa, `X-Admin-Token` header gerekir. Frontend'de `localStorage.setItem('alsat_admin_token', 'your-token')` ile ayarlanabilir.

---

## 📋 PLANLANAN ÖZELLİKLER (Stub / Sonraki Adımlar)

### Güvenlik
- **reCAPTCHA**: Kayıt ve ilan formuna `data-sitekey` + backend verify
- **2FA**: TOTP (google-authenticator) veya SMS doğrulama
- **Hesap kilitleme**: Zaten `checkLoginLockout` var
- **E-posta doğrulama**: `sendVerificationCode` zaten var

### Kullanıcı Deneyimi
- **Otomatik tamamlama**: Arama input'unda `oninput` + debounce + öneri listesi
- **Son aramalar**: `searchHistory` zaten var, UI iyileştirilebilir
- **Sıralama**: `sort-select` zaten var (newest, price)
- **Sonsuz scroll**: `IntersectionObserver` ile liste sonunda yeni sayfa yükleme
- **Gelişmiş filtreler**: Kategoriye özel (km, m², marka) - `attrs` ile genişletilebilir

### Satıcı
- **Toplu işlem**: Admin'de checkbox + "Seçilenleri Sil" zaten var
- **İlan şablonları**: `ad_drafts` tablosu hazır
- **Takvimli yayın**: `status: 'scheduled'` + cron job
- **Fiyat önerisi**: Kategori ortalama fiyatı - `getCategoryAvgPrice` zaten var

### Mesajlaşma
- **Web Push**: Service Worker + Push API + VAPID keys
- **Okundu bilgisi**: `messages` tablosuna `read_at` kolonu
- **Mesaj şablonları**: Sabit metin listesi

### Ödeme
- **Stripe**: `stripe` npm + webhook
- **PayPal**: `@paypal/checkout-server-sdk`
- **Yerel**: Payzy, Monet, vb. entegrasyon

### Teknik
- **Redis**: `rateLimit`, `refreshToken` store, session cache
- **Elasticsearch**: Full-text search (title, description)
- **CDN**: Cloudflare veya benzeri
- **WebP**: Resize/convert pipeline

### Admin Dashboard
- **Grafikler**: Chart.js veya benzeri
- **Moderasyon kuyruğu**: Bekleyen ilanlar zaten var
- **A/B test**: Feature flags (localStorage / DB)

---

## 🆕 YENİ ÖNERİLER

1. **Canlı destek widget** – Tawk.to, Crisp veya özel chat
2. **İlan öne çıkarma paketleri** – Haftalık/aylık "Öne Çıkan" aboneliği
3. **Satıcı rozetleri** – "Hızlı Yanıtlayan", "Güvenilir Satıcı"
4. **İlan karşılaştırma PDF** – 2–3 ilanı PDF olarak indir
5. **Bölgesel duyurular** – Şehir bazlı özel kampanyalar
6. **API için rate limit dashboard** – Admin'de IP bazlı limit görüntüleme
7. **Çoklu dil URL** – `/tr/`, `/mk/` path'leri (SEO)
8. **Mobil uygulama** – Capacitor ile PWA → Native
9. **Sosyal giriş** – Google, Facebook OAuth
10. **Analytics export** – CSV/Excel indirme

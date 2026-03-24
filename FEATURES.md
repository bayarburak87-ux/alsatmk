# Alsat - Eklenen Özellikler, Roadmap ve Öneriler

## Şu ana kadar eklenenler (aktif)

### Frontend
- **Favori senkronizasyonu (API)**: Login sonrası/yenilemede favoriler API’den çekilir
- **Favori aksiyonu (API)**: `toggleFavorite` backend ile çalışır
- **İlan silme (API)**: `DELETE /api/ads/:id` entegrasyonu
- **İlan raporlama (API)**: `POST /api/ads/:id/report` entegrasyonu
- **Telefon gizleme (UI)**: İlan formunda `Telefonu gizle` seçeneği; detayda `Numarayı Göster`
- **Taslak kaydetme**: “Taslak Kaydet” butonu (frontend + backend)
- **Sosyal paylaşım**: WhatsApp, Facebook, X, QR kod, link kopyalama
- **Popüler aramalar**: Arama çubuğunda API’den gelen öneriler
- **PWA**: `sw.js` ile temel offline cache
- **SEO/Meta**: İlan detayı açılınca dinamik meta etiketleri güncellenir
- **Admin Panel - Online**: “Online” sekmesi ve IP bazlı aktif kullanıcı listesi
- **Karşılaştırma**: Compare bar/limit (mevcut)

### Backend API
- **İlanlar**
  - `PUT /api/ads/:id` (sahibi günceller)
  - `DELETE /api/ads/:id` (sahibi siler)
- **Mesajlaşma**
  - `GET/POST /api/conversations`
  - `GET/POST /api/conversations/:id/messages`
- **Dosya yükleme**
  - `POST /api/upload` (Base64 veya Cloudinary)
- **Raporlar**
  - `GET /api/admin/reports`
  - `POST /api/admin/reports/:id/action`
- **Yeni modüller**
  - **Fiyat takibi**: `GET/POST/DELETE /api/price-alerts`
  - **İlan taslakları**: `GET/POST/PUT/DELETE /api/drafts`
  - **Kullanıcı puanlamaları**: `POST /api/ratings`, `GET /api/users/:id/ratings`
  - **Popüler aramalar**: `GET/POST /api/popular-searches`
  - **Telefon görüntüleme istatistiği**: `POST /api/ads/:id/phone-view`
- **Admin**
  - **Online kullanıcılar**: `GET /api/admin/online-users` (admin token ile)

### Cron / E-posta
- **Arama kaydı e-postaları**: `backend/jobs/search-alert-cron.js`
- **Fiyat düşünce e-postaları**: `backend/jobs/price-alert-cron.js`

### Veritabanı
- `price_alerts` (fiyat takibi)
- `ad_drafts` (taslaklar)
- `user_ratings` (satıcı puanları)
- `popular_searches` (popüler aramalar)
- `phone_views` (telefon görüntüleme)
- `ads.hide_phone` (telefon gizleme)
- `active_sessions` (şema tarafında opsiyonel; şu an online takibi in-memory yapılıyor)

## Roadmap - yeni öneriler

### Güvenlik (öncelik)
1. ~~**reCAPTCHA**~~: ✅ Hazır – `window.RECAPTCHA_SITE_KEY` doldurulunca login formunda aktif (v3, backend doğrulama eklenebilir)
2. **2FA (TOTP / SMS)**: Hesap güvenliği
3. **İlan doğrulama akışı**: Şüpheli ilanlar için doğrulama (SMS/e-posta)
4. **CSRF / rate-limit iyileştirme**: Daha agresif throttling (özellikle mesajlaşma ve ilan aksiyonları)
5. **Şifreleme & gizlilik**: Telefon gizleme yanında “numara maskeleme” (kısmi gösterim)

### Kullanıcı deneyimi (öncelik)
6. **Otomatik tamamlama + debounce**: Arama önerileri daha hızlı ve doğru gelsin
7. **Son aramalar UI**: Hem cihaz bazlı hem kullanıcı bazlı senkron
8. **Sıralama iyileştirmeleri**: “Fiyat: düşük-yüksek”, “Son eklenen”, “En çok tıklanan” gibi
9. **Sonsuz scroll / sayfa önbelleği**: Performans ve akıcılık
10. **Gelişmiş filtreler**: Kategoriye özel `attrs` tabanlı filtreleme (km, m², marka, model)

### Satıcı araçları
11. **İlan şablonları**: Sık kullanılan ilan taslaklarını kopyalama
12. **Takvimli yayın**: Belirli tarihte/saate yayınlama (cron ile)
13. **Fiyat önerisi**: Kategori ortalamasına göre “makul fiyat aralığı”
14. **Toplu işlem**: Admin’de/ kullanıcıda birden çok ilan seçip işlem
15. **Satış raporu**: “son 7 gün satış”, “en çok ilgi gören ilan”

### Mesajlaşma & bildirimler
16. **WebSocket**: Gerçek zamanlı mesajlaşma (poll yerine)
17. **Okundu bilgisi**: Mesaj tablosuna `read_at` yaklaşımı
18. **Bildirim sistemi**: Web Push + in-app bildirimler
19. **Mesaj şablonları**: “Fiyat sabit mi?”, “Hâlâ satılık mı?” gibi
20. **Spam filtre**: Aynı metnin tekrarını ve link paylaşımını sınırla

### Ödeme & gelir
21. **Stripe / PayPal**: Premium/kreid satın alma
22. **Yerel ödeme entegrasyonları**: Makedonya’ya uygun yöntemler
23. **Plan abonelikleri**: Haftalık/aylık “Öne çıkar”
24. **Webhook + muhasebe log**: Ödeme sonrası durum senkronu

### İçerik keşif
25. **Benzer ilanlar**: Kategori + `attrs` benzerliğine göre liste
26. **Trendler**: “Bu hafta artan aramalar”, “Şehir trendi”
27. **Karşılaştırma PDF**: 2-3 ilanı PDF olarak indir
28. **Konum/harita filtreleme**: Şehir + yarıçap yaklaşımı

### Teknik / altyapı
29. **Elasticsearch / tam metin arama**: Büyük veri için aramayı hızlandırma
30. **Image pipeline**: WebP + boyutlandırma (CDN ile)
31. **CDN**: Cloudflare veya benzeri
32. **Analytics & event tracking**: Dönüşüm oranları, funnel metrikleri
33. **Rate-limit dashboard**: Admin panelde IP bazlı limit izleme

### Admin & moderasyon
34. **Moderasyon kuyruğu**: Bekleyen ilanlar için hızlandırılmış ekran
35. **Admin istatistik grafikler**: Chart.js (örnek: views/clicks trendlere göre)
36. **Export/CSV**: Raporları dışa aktar

### Ayrıca (YENI ÖNERILERden eksikler + yeni fikirler)
37. **Canlı destek widget**: Tawk.to, Crisp veya özel sohbet
38. **Satıcı rozetleri**: “Hızlı yanıtlayan”, “güvenilir satıcı” gibi
39. **Bölgesel duyurular/kampanyalar**: Şehir/bölge bazlı özel kampanya
40. **Çoklu dil URL**: `/tr/`, `/mk/`, `/en/` yapısı ile SEO güçlendirme
41. **Mobil uygulama**: Capacitor ile PWA → native hissi
42. **Sosyal giriş (OAuth)**: Google/Facebook login
43. **Analytics export**: CSV/Excel indirme (ilan bazlı funnel)
44. **İlan öne çıkarma paketleri**: Haftalık/aylık “Öne Çıkan” paketler
45. **İlan karşılaştırma PDF**: 2-3 ilanı PDF olarak indir
46. **Kullanıcı yorum & güven skoru**: İşlem sonrası yorum sistemi
47. **Şikayet inceleme SLA**: “X saatte çözüldü” istatistiği

## Hemen seçmemi istersen
En hızlı değer getiren 3 konu:
- reCAPTCHA / güvenlik
- WebSocket + bildirim (mesajlaşma)
- gelişmiş filtreler + sonsuz scroll (keşif)

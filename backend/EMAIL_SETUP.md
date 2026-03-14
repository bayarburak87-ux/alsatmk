# E-posta Kurulumu (info@alsatmk.com)

Alsat, doğrulama kodlarını ve şifre sıfırlama e-postalarını **info@alsatmk.com** adresinden gönderir.

## 1. SMTP Ayarları

`backend/.env` dosyasına ekleyin:

```env
SMTP_HOST=smtp.alsatmk.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=info@alsatmk.com
SMTP_PASS=posta_sifreniz
MAIL_FROM="Alsat" <info@alsatmk.com>
```

### Hosting sağlayıcınıza göre örnekler

**cPanel / Plesk (paylaşımlı hosting):**
- SMTP_HOST: `mail.alsatmk.com` veya sunucunuzun mail adresi
- SMTP_PORT: 587 (TLS) veya 465 (SSL)
- SMTP_USER: info@alsatmk.com
- SMTP_PASS: E-posta hesabının şifresi

**Gmail (test için):**
- SMTP_HOST: smtp.gmail.com
- SMTP_PORT: 587
- SMTP_USER: gmail-adresiniz
- SMTP_PASS: Uygulama şifresi (2 adımlı doğrulama açıksa)

## 2. Özellikler

- **Kayıt:** Kullanıcı e-postasına 6 haneli doğrulama kodu gider
- **Şifremi Unuttum:** Kullanıcı e-postasına 6 haneli kod gider, yeni şifre belirlenir

## 3. Test

SMTP_PASS boş bırakılırsa e-posta gönderilmez (konsola uyarı yazılır). Gerçek gönderim için mutlaka şifre tanımlayın.

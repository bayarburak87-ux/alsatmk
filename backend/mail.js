/**
 * E-posta gönderimi - info@alsatmk.com (nodemailer)
 * .env: SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS
 */
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587', 10),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER || 'info@alsatmk.com',
    pass: process.env.SMTP_PASS || ''
  }
});

const FROM = process.env.MAIL_FROM || '"Alsat" <info@alsatmk.com>';

async function sendMail(to, subject, html) {
  if (!process.env.SMTP_PASS) {
    console.error('SMTP_PASS tanımlı değil - e-posta gönderilemiyor. .env dosyasına SMTP ayarlarını ekleyin.');
    const err = new Error('E-posta servisi yapılandırılmamış. Lütfen daha sonra tekrar deneyin.');
    err.code = 'SMTP_NOT_CONFIGURED';
    throw err;
  }
  const info = await transporter.sendMail({
    from: FROM,
    to,
    subject,
    html
  });
  return { ok: true, messageId: info.messageId };
}

function sendVerificationCode(email, code, type) {
  const isRegister = type === 'register';
  const subject = isRegister ? 'Alsat - Kayıt Doğrulama Kodu' : 'Alsat - Şifre Sıfırlama Kodu';
  const html = `
    <div style="font-family:sans-serif;max-width:400px;margin:0 auto;">
      <h2 style="color:#6c5ce7;">Alsat - ${isRegister ? 'Kayıt' : 'Şifre Sıfırlama'}</h2>
      <p>Doğrulama kodunuz:</p>
      <p style="font-size:28px;font-weight:bold;letter-spacing:8px;color:#6c5ce7;">${code}</p>
      <p style="color:#666;font-size:14px;">Bu kod 10 dakika geçerlidir.</p>
      <hr style="border:none;border-top:1px solid #eee;">
      <p style="color:#999;font-size:12px;">Bu e-postayı siz istemediyseniz yoksayabilirsiniz.</p>
    </div>`;
  return sendMail(email, subject, html);
}

async function sendSearchAlertEmail(email, query, filters, ads) {
  const q = query || 'Tüm ilanlar';
  const items = ads.slice(0, 10).map(a => `
    <div style="padding:12px;border-bottom:1px solid #eee;">
      <a href="${process.env.SITE_URL || 'https://www.alsatmk.com'}/#ad=${a.id}" style="color:#6c5ce7;text-decoration:none;font-weight:bold;">${(a.title || '').slice(0, 80)}</a>
      <p style="margin:4px 0 0;color:#666;font-size:14px;">${a.price || 0} ${a.currency || 'MKD'} · ${a.city || ''}</p>
    </div>`).join('');
  const html = `
    <div style="font-family:sans-serif;max-width:500px;margin:0 auto;">
      <h2 style="color:#6c5ce7;">Alsat - Arama Kaydı</h2>
      <p>Aradığınız "<strong>${q}</strong>" ile eşleşen ${ads.length} yeni ilan bulundu:</p>
      ${items}
      <p style="margin-top:16px;"><a href="${process.env.SITE_URL || 'https://www.alsatmk.com'}" style="color:#6c5ce7;">Tüm ilanları gör →</a></p>
      <hr style="border:none;border-top:1px solid #eee;margin-top:24px;">
      <p style="color:#999;font-size:12px;">Arama kaydınızı profilinizden kaldırabilirsiniz.</p>
    </div>`;
  return sendMail(email, 'Alsat - Yeni ilanlar eklendi', html);
}

async function sendPriceDropEmail(email, adTitle, oldPrice, newPrice, currency, adId) {
  const html = `
    <div style="font-family:sans-serif;max-width:500px;margin:0 auto;">
      <h2 style="color:#6c5ce7;">Alsat - Fiyat Düştü!</h2>
      <p>Takip ettiğiniz ilanın fiyatı düştü:</p>
      <p style="font-size:18px;font-weight:bold;">${(adTitle || '').slice(0, 100)}</p>
      <p style="font-size:24px;color:#e53935;">${oldPrice} ${currency} → <strong>${newPrice} ${currency}</strong></p>
      <p><a href="${process.env.SITE_URL || 'https://www.alsatmk.com'}/#ad=${adId}" style="background:#6c5ce7;color:white;padding:12px 24px;text-decoration:none;border-radius:8px;display:inline-block;">İlanı Gör →</a></p>
      <hr style="border:none;border-top:1px solid #eee;margin-top:24px;">
      <p style="color:#999;font-size:12px;">Fiyat takibini profilinizden kaldırabilirsiniz.</p>
    </div>`;
  return sendMail(email, 'Alsat - Fiyat düştü: ' + (adTitle || '').slice(0, 50), html);
}

module.exports = { sendMail, sendVerificationCode, sendSearchAlertEmail, sendPriceDropEmail };

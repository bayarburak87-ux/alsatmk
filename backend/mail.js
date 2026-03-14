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
    console.warn('SMTP_PASS tanımlı değil - e-posta gönderilmiyor');
    return { ok: true, simulated: true };
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

module.exports = { sendMail, sendVerificationCode };

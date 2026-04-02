/**
 * E-posta gönderimi
 *
 * Railway / benzeri ortamlarda çıkış SMTP (587/465) çoğu planda engellidir — bağlantı zaman aşımı görürsünüz.
 * Bu yüzden öncelik: HTTPS API (Resend veya SendGrid), yedek: nodemailer + SMTP.
 *
 * .env:
 *   RESEND_API_KEY=re_...     (önerilir, https://resend.com)
 *   veya SENDGRID_API_KEY=SG... (SendGrid)
 *   RESEND_FROM="Alsat <noreply@sizin-domain.com>"  (Resend panelinde doğrulanmış gönderen)
 *   SMTP_* — sadece SMTP’nin izin verildiği sunucularda
 */
const nodemailer = require('nodemailer');
const config = require('./config');

function smtpPassRaw() {
  return (process.env.SMTP_PASS || '').replace(/\s+/g, '');
}

function hasHttpMail() {
  return !!((process.env.RESEND_API_KEY || '').trim() || (process.env.SENDGRID_API_KEY || '').trim());
}

function hasSmtpMail() {
  return !!smtpPassRaw();
}

function hasMailTransport() {
  return hasHttpMail() || hasSmtpMail();
}

/** "Alsat" <a@b.com> veya <a@b.com> veya düz adres */
function parseFromHeader() {
  const raw = process.env.RESEND_FROM || process.env.MAIL_FROM || '"Alsat" <info@alsatmk.com>';
  const m = raw.match(/^"(.+)"\s*<([^>]+)>/);
  if (m) return { name: m[1], email: m[2].trim() };
  const m2 = raw.match(/<([^>]+)>/);
  if (m2) return { name: 'Alsat', email: m2[1].trim() };
  return { name: 'Alsat', email: raw.replace(/"/g, '').trim() };
}

function fromString() {
  const { name, email } = parseFromHeader();
  return `${name} <${email}>`;
}

const FETCH_TIMEOUT_MS = parseInt(process.env.EMAIL_API_TIMEOUT_MS || '25000', 10);

async function fetchWithTimeout(url, options) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), FETCH_TIMEOUT_MS);
  try {
    return await fetch(url, { ...options, signal: ctrl.signal });
  } finally {
    clearTimeout(t);
  }
}

async function sendViaResend(to, subject, html) {
  const key = (process.env.RESEND_API_KEY || '').trim();
  if (!key) return null;
  const from = process.env.RESEND_FROM ? process.env.RESEND_FROM.trim() : fromString();
  const r = await fetchWithTimeout('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from, to: [to], subject, html })
  });
  const j = await r.json().catch(() => ({}));
  if (!r.ok) {
    const detail = j.message || j.name || (Array.isArray(j.errors) && j.errors[0]?.message) || JSON.stringify(j);
    const err = new Error(detail || `Resend HTTP ${r.status}`);
    err.code = 'MAIL_API_FAILED';
    err.status = 503;
    throw err;
  }
  return { ok: true, messageId: j.id || 'resend' };
}

async function sendViaSendGrid(to, subject, html) {
  const key = (process.env.SENDGRID_API_KEY || '').trim();
  if (!key) return null;
  const { name, email } = parseFromHeader();
  const r = await fetchWithTimeout('https://api.sendgrid.com/v3/mail/send', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      personalizations: [{ to: [{ email: to }] }],
      from: { email, name },
      subject,
      content: [{ type: 'text/html', value: html }]
    })
  });
  if (!r.ok) {
    const text = await r.text().catch(() => '');
    let msg = text;
    try {
      const j = JSON.parse(text);
      msg = j.errors?.[0]?.message || j.message || text;
    } catch (e) {}
    const err = new Error(msg || `SendGrid HTTP ${r.status}`);
    err.code = 'MAIL_API_FAILED';
    err.status = 503;
    throw err;
  }
  return { ok: true, messageId: r.headers.get('x-message-id') || 'sendgrid' };
}

function createTransport() {
  const port = parseInt(process.env.SMTP_PORT || '587', 10);
  const pass = smtpPassRaw();
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port,
    secure: process.env.SMTP_SECURE === 'true',
    requireTLS: port === 587 && process.env.SMTP_SECURE !== 'true',
    connectionTimeout: 20000,
    greetingTimeout: 20000,
    auth: pass
      ? {
          user: process.env.SMTP_USER || 'info@alsatmk.com',
          pass
        }
      : undefined
  });
}

async function sendViaSmtp(to, subject, html) {
  const pass = smtpPassRaw();
  if (!pass) {
    if (config.isDev) {
      console.warn('[mail DEV] SMTP_PASS yok — e-posta gönderilmedi:', { to, subject });
      return { ok: true, messageId: 'dev-no-smtp' };
    }
    console.error('SMTP_PASS tanımlı değil - e-posta gönderilemiyor.');
    const err = new Error('E-posta servisi yapılandırılmamış. Railway kullanıyorsanız RESEND_API_KEY ekleyin (SMTP çoğu planda engellenir).');
    err.code = 'SMTP_NOT_CONFIGURED';
    throw err;
  }
  const transporter = createTransport();
  const FROM = process.env.MAIL_FROM || '"Alsat" <info@alsatmk.com>';
  try {
    const info = await transporter.sendMail({
      from: FROM,
      to,
      subject,
      html
    });
    return { ok: true, messageId: info.messageId };
  } catch (e) {
    const msg = String(e.message || '');
    const timedOut = /timeout|ETIMEDOUT|ECONNRESET|Connection timeout/i.test(msg + (e.code || ''));
    const err = new Error(
      e.code === 'EAUTH' || /Invalid login|authentication failed/i.test(msg)
        ? 'SMTP girişi başarısız. Gmail için Uygulama şifresi kullandığınızdan emin olun.'
        : timedOut
          ? 'SMTP bağlantısı zaman aşımı. Railway ve benzeri ortamlarda 587/465 genelde engellenir — RESEND_API_KEY veya SENDGRID_API_KEY ile HTTPS üzerinden gönderin.'
          : 'E-posta gönderilemedi: ' + (msg || 'bilinmeyen hata')
    );
    err.code = 'SMTP_SEND_FAILED';
    err.status = 503;
    err.cause = e;
    throw err;
  }
}

function wrapUnexpectedMailError(e) {
  const known = ['MAIL_API_FAILED', 'SMTP_NOT_CONFIGURED', 'SMTP_SEND_FAILED'];
  if (e && known.includes(e.code)) return e;
  const raw = String(e && e.message ? e.message : e || '');
  const code = e && e.code;
  const msg =
    e && e.name === 'AbortError'
      ? 'E-posta servisine bağlantı zaman aşımı. Lütfen tekrar deneyin.'
      : /fetch failed|ECONNRESET|ENOTFOUND|ETIMEDOUT|ECONNREFUSED|EAI_AGAIN|certificate|TLS|getaddrinfo/i.test(raw + String(code || ''))
        ? 'E-posta sunucusuna ulaşılamadı. İnternetinizi kontrol edin; bir süre sonra tekrar deneyin.'
        : 'E-posta gönderilemedi: ' + (raw || 'bilinmeyen hata');
  const err = new Error(msg);
  err.code = 'MAIL_SEND_FAILED';
  err.status = 503;
  err.cause = e;
  return err;
}

async function sendMail(to, subject, html) {
  try {
    if ((process.env.RESEND_API_KEY || '').trim()) {
      return await sendViaResend(to, subject, html);
    }
    if ((process.env.SENDGRID_API_KEY || '').trim()) {
      return await sendViaSendGrid(to, subject, html);
    }
    return await sendViaSmtp(to, subject, html);
  } catch (e) {
    throw wrapUnexpectedMailError(e);
  }
}

function sendVerificationCode(email, code, type) {
  if (!hasMailTransport() && config.isDev) {
    console.warn(`[mail DEV] Doğrulama (${type}) → ${email}: kod = ${code} (Yayında RESEND_API_KEY veya SMTP tanımlayın)`);
    return Promise.resolve({ ok: true, messageId: 'dev-code-logged' });
  }
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

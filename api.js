/**
 * Alsat API İstemcisi
 * Backend kullanmak için index.html'de: window.API_BASE = 'http://localhost:3001';
 */
(function() {
  window.API_BASE = window.API_BASE || '';
  const base = () => window.API_BASE;

  async function fetchJson(url, opts) {
    const res = await fetch(url, opts);
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      const err = new Error(data.error || res.statusText);
      err.error = data.error;
      throw err;
    }
    return data;
  }

  window.AlsatAPI = {
    async health() {
      if (!base()) return null;
      try {
        return await fetchJson(base() + '/api/health');
      } catch (e) { return null; }
    },
    async fetchAdsFull() {
      if (!base()) return null;
      try {
        const rows = await fetchJson(base() + '/api/ads-full');
        return Array.isArray(rows) ? rows : [];
      } catch (e) { return null; }
    },
    async fetchUsers() {
      if (!base()) return null;
      try {
        return await fetchJson(base() + '/api/users');
      } catch (e) { return null; }
    },
    async login(email, password) {
      if (!base()) return null;
      const r = await fetchJson(base() + '/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      return r;
    },
    async sendCode(type, email) {
      if (!base()) return null;
      return fetchJson(base() + '/api/auth/send-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, email })
      });
    },
    async verifyRegister(email, code, name, password) {
      if (!base()) return null;
      const r = await fetchJson(base() + '/api/auth/verify-register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code, name, password })
      });
      return r;
    },
    async verifyForgot(email, code, newPassword) {
      if (!base()) return null;
      return fetchJson(base() + '/api/auth/verify-forgot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code, newPassword })
      });
    },
    async createAd(data) {
      if (!base()) return null;
      const payload = {
        userId: data.userId || 0,
        title: data.title,
        price: data.price,
        currency: data.currency || 'EUR',
        category: data.category,
        subCategory: data.subCategory,
        city: data.city,
        district: data.district || '',
        description: data.description || '',
        images: data.images || [],
        attrs: data.attrs || {},
        condition: data.condition || 'İkinci El',
        sellerType: data.sellerType || 'Sahibinden',
        status: data.status || 'pending',
        acceptTrade: !!data.acceptTrade
      };
      const r = await fetchJson(base() + '/api/ads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      return r.id;
    },
    async addFavorite(userId, adId) {
      if (!base()) return;
      try {
        await fetch(base() + '/api/favorites', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId, adId })
        });
      } catch (e) {}
    },
    async removeFavorite(userId, adId) {
      if (!base()) return;
      try {
        await fetch(base() + '/api/favorites/' + userId + '/' + adId, { method: 'DELETE' });
      } catch (e) {}
    },
    async resetAll(token) {
      if (!base()) return null;
      const headers = { 'Content-Type': 'application/json' };
      if (token) headers['X-Admin-Token'] = token;
      const res = await fetch(base() + '/api/admin/reset', { method: 'POST', headers });
      if (!res.ok) throw new Error(res.statusText);
      return res.json();
    },
    normalizeAds(rows) {
      if (!Array.isArray(rows)) return [];
      return rows.map(r => ({
        id: r.id,
        userId: r.user_id,
        title: r.title,
        price: r.price,
        currency: r.currency || 'EUR',
        category: r.category,
        subCategory: r.sub_category,
        city: r.city,
        district: r.district,
        description: r.description || '',
        images: Array.isArray(r.images) ? r.images : (r.images ? JSON.parse(r.images || '[]') : []),
        video: r.video,
        attrs: r.attrs && typeof r.attrs === 'object' ? r.attrs : (r.attrs ? JSON.parse(r.attrs || '{}') : {}),
        condition: r.condition || 'İkinci El',
        sellerType: r.seller_type || 'Sahibinden',
        status: r.status || 'approved',
        views: r.views || 0,
        clicks: r.clicks || 0,
        favCount: r.fav_count || 0,
        acceptTrade: !!(r.accept_trade || r.acceptTrade),
        priceHistory: r.priceHistory || (r.price_history ? (typeof r.price_history === 'object' ? r.price_history : JSON.parse(r.price_history || '[]')) : []),
        soldAt: r.sold_at,
        createdAt: r.created_at,
        expiryAt: r.expiry_at,
        featured: !!(r.featured || r.urgent)
      }));
    }
  };
})();

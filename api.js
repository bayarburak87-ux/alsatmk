/**
 * Alsat API İstemcisi
 * Token desteği: Login/verify sonrası token saklanır, tüm auth gerektiren isteklerde gönderilir
 * Backend: window.API_BASE = 'http://localhost:3001';
 */
(function() {
  if (!window.API_BASE && typeof location !== 'undefined') {
    var h = (location.hostname || '');
    window.API_BASE = (h === 'localhost' || h === '127.0.0.1')
      ? 'http://localhost:3001'
      : (location.protocol + '//' + location.host);
  }
  window.API_BASE = window.API_BASE || '';
  const base = () => window.API_BASE;
  const TOKEN_KEY = 'alsat_token';
  const REFRESH_KEY = 'alsat_refresh';

  function getToken() {
    return localStorage.getItem(TOKEN_KEY);
  }

  function setToken(token) {
    if (token) localStorage.setItem(TOKEN_KEY, token);
    else localStorage.removeItem(TOKEN_KEY);
  }

  function setRefreshToken(token) {
    if (token) localStorage.setItem(REFRESH_KEY, token);
    else localStorage.removeItem(REFRESH_KEY);
  }

  function getAuthHeaders() {
    const token = getToken();
    const h = { 'Content-Type': 'application/json' };
    if (token) h['Authorization'] = 'Bearer ' + token;
    return h;
  }

  async function fetchJson(url, opts = {}) {
    opts.headers = { ...getAuthHeaders(), ...(opts.headers || {}) };
    const res = await fetch(url, opts);
    const data = await res.json().catch(() => ({}));
    if (res.status === 401 && data.error && data.error.includes('token')) {
      const refresh = localStorage.getItem(REFRESH_KEY);
      if (refresh) {
        try {
          const r = await fetch(base() + '/api/auth/refresh', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ refreshToken: refresh })
          });
          const j = await r.json();
          if (j.token) {
            setToken(j.token);
            opts.headers['Authorization'] = 'Bearer ' + j.token;
            const retry = await fetch(url, opts);
            const retryData = await retry.json().catch(() => ({}));
            if (!retry.ok) throw new Error(retryData.error || retry.statusText);
            return retryData;
          }
        } catch (e) {}
        setToken(null);
        setRefreshToken(null);
      }
    }
    if (!res.ok) {
      const err = new Error(data.error || res.statusText);
      err.error = data.error;
      throw err;
    }
    return data;
  }

  window.AlsatAPI = {
    getToken,
    setToken,
    setRefreshToken,
    isLoggedIn() {
      return !!getToken();
    },

    async health() {
      if (!base()) return null;
      try {
        return await fetchJson(base() + '/api/health');
      } catch (e) { return null; }
    },

    async me() {
      if (!base()) return null;
      try {
        return await fetchJson(base() + '/api/auth/me');
      } catch (e) { return null; }
    },

    async fetchAdsFull() {
      if (!base()) return null;
      try {
        const rows = await fetchJson(base() + '/api/ads-full');
        return Array.isArray(rows) ? rows : [];
      } catch (e) { return null; }
    },

    async fetchAds(params = {}) {
      if (!base()) return null;
      try {
        const qs = new URLSearchParams(params).toString();
        const url = base() + '/api/ads' + (qs ? '?' + qs : '');
        const data = await fetchJson(url);
        if (data && data.items) return data;
        return Array.isArray(data) ? { items: data, total: data.length, page: 1, limit: data.length, pages: 1 } : { items: [], total: 0, page: 1, limit: 20, pages: 0 };
      } catch (e) { return null; }
    },

    async fetchUsers() {
      if (!base()) return null;
      try {
        return await fetchJson(base() + '/api/users');
      } catch (e) { return null; }
    },

    async login(email, password, recaptchaToken) {
      if (!base()) return null;
      const body = { email, password };
      if (recaptchaToken) body.recaptchaToken = recaptchaToken;
      const r = await fetchJson(base() + '/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      if (r.token) setToken(r.token);
      if (r.refreshToken) setRefreshToken(r.refreshToken);
      return r;
    },

    logout() {
      setToken(null);
      setRefreshToken(null);
    },

    async sendCode(type, email) {
      if (!base()) return null;
      return fetchJson(base() + '/api/auth/send-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, email })
      });
    },

    async verifyRegister(email, code, name, password, phone) {
      if (!base()) return null;
      const r = await fetchJson(base() + '/api/auth/verify-register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code, name, password, phone })
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

    async changePassword(currentPassword, newPassword) {
      if (!base()) return null;
      return fetchJson(base() + '/api/auth/change-password', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ currentPassword, newPassword })
      });
    },

    async createAd(data) {
      if (!base()) return null;
      const payload = {
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
        headers: getAuthHeaders(),
        body: JSON.stringify(payload)
      });
      return r.id;
    },

    async updateAd(adId, data) {
      if (!base()) return null;
      return fetchJson(base() + '/api/ads/' + adId, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(data)
      });
    },

    async deleteAd(adId) {
      if (!base()) return null;
      return fetchJson(base() + '/api/ads/' + adId, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });
    },

    async reportAd(adId, reason) {
      if (!base()) return null;
      return fetchJson(base() + '/api/ads/' + adId + '/report', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ reason: reason || '' })
      });
    },

    async addFavorite(adId) {
      if (!base()) return;
      try {
        await fetchJson(base() + '/api/favorites', {
          method: 'POST',
          headers: getAuthHeaders(),
          body: JSON.stringify({ adId })
        });
      } catch (e) {}
    },

    async removeFavorite(userId, adId) {
      if (!base()) return;
      try {
        const res = await fetch(base() + '/api/favorites/' + userId + '/' + adId, {
          method: 'DELETE',
          headers: { 'Authorization': 'Bearer ' + getToken() }
        });
        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          const err = new Error(data.error || res.statusText);
          err.error = data.error;
          throw err;
        }
      } catch (e) { throw e; }
    },

    async getFavorites(userId) {
      let uid = userId;
      if (uid == null) {
        const me = await this.me();
        if (!me) return [];
        uid = me.id;
      }
      try {
        return await fetchJson(base() + '/api/favorites/' + uid);
      } catch (e) { return []; }
    },

    async getPriceAlerts() {
      if (!base()) return [];
      try { return await fetchJson(base() + '/api/price-alerts'); } catch (e) { return []; }
    },
    async addPriceAlert(adId, priceAtSubscribe, adTitle) {
      if (!base()) return; try { await fetchJson(base() + '/api/price-alerts', { method: 'POST', headers: getAuthHeaders(), body: JSON.stringify({ adId, priceAtSubscribe, adTitle }) }); } catch (e) {}
    },
    async removePriceAlert(adId) {
      if (!base()) return; try { await fetch(base() + '/api/price-alerts/' + adId, { method: 'DELETE', headers: { 'Authorization': 'Bearer ' + getToken() } }); } catch (e) {}
    },
    async getDrafts() {
      if (!base()) return []; try { return await fetchJson(base() + '/api/drafts'); } catch (e) { return []; }
    },
    async saveDraft(data) {
      if (!base()) return null; try { const r = await fetchJson(base() + '/api/drafts', { method: 'POST', headers: getAuthHeaders(), body: JSON.stringify({ data }) }); return r.id; } catch (e) { return null; }
    },
    async updateDraft(draftId, data) {
      if (!base()) return; try { await fetchJson(base() + '/api/drafts/' + draftId, { method: 'PUT', headers: getAuthHeaders(), body: JSON.stringify({ data }) }); } catch (e) {}
    },
    async deleteDraft(draftId) {
      if (!base()) return; try { await fetch(base() + '/api/drafts/' + draftId, { method: 'DELETE', headers: { 'Authorization': 'Bearer ' + getToken() } }); } catch (e) {}
    },
    async submitRating(toUserId, adId, conversationId, rating, comment) {
      if (!base()) return; try { await fetchJson(base() + '/api/ratings', { method: 'POST', headers: getAuthHeaders(), body: JSON.stringify({ toUserId, adId, conversationId, rating, comment }) }); } catch (e) {}
    },
    async getUserRatings(userId) {
      if (!base()) return { avg: 0, count: 0, ratings: [] }; try { return await fetchJson(base() + '/api/users/' + userId + '/ratings'); } catch (e) { return { avg: 0, count: 0, ratings: [] }; }
    },
    async recordPopularSearch(query) {
      if (!base() || !query || !query.trim()) return; try { await fetch(base() + '/api/popular-searches', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ query: query.trim() }) }); } catch (e) {}
    },
    async getPopularSearches(limit) {
      if (!base()) return []; try { const r = await fetch(base() + '/api/popular-searches?limit=' + (limit || 10)); return await r.json(); } catch (e) { return []; }
    },
    async recordPhoneView(adId) {
      if (!base()) return; try { await fetch(base() + '/api/ads/' + adId + '/phone-view', { method: 'POST', headers: getAuthHeaders() }); } catch (e) {}
    },
    async addSearchAlert(query, filters, email) {
      if (!base()) return null;
      const r = await fetchJson(base() + '/api/search-alerts', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ query, filters, email })
      });
      return r.id;
    },

    async getSearchAlerts() {
      if (!base()) return [];
      try {
        return await fetchJson(base() + '/api/search-alerts');
      } catch (e) { return []; }
    },

    async getConversations() {
      if (!base()) return [];
      try {
        return await fetchJson(base() + '/api/conversations');
      } catch (e) { return []; }
    },

    async getConversationMessages(convId) {
      if (!base()) return [];
      try {
        return await fetchJson(base() + '/api/conversations/' + convId + '/messages');
      } catch (e) { return []; }
    },

    async createConversation(adId) {
      if (!base()) return null;
      const r = await fetchJson(base() + '/api/conversations', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ adId })
      });
      return r.id;
    },

    async sendMessage(convId, text) {
      if (!base()) return null;
      const r = await fetchJson(base() + '/api/conversations/' + convId + '/messages', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ text })
      });
      return r.id;
    },

    async markMessagesAsRead(convId) {
      if (!base()) return;
      try {
        await fetch(base() + '/api/conversations/' + convId + '/messages/read', {
          method: 'PATCH',
          headers: getAuthHeaders()
        });
      } catch (e) {}
    },

    async uploadFile(file) {
      if (!base()) return null;
      const fd = new FormData();
      fd.append('file', file);
      const token = getToken();
      const headers = {};
      if (token) headers['Authorization'] = 'Bearer ' + token;
      const res = await fetch(base() + '/api/upload', { method: 'POST', headers, body: fd });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || res.statusText);
      return data.url;
    },

    async getOnlineUsers(adminToken) {
      if (!base()) return { total: 0, uniqueIps: 0, users: [] };
      try {
        const headers = { 'Content-Type': 'application/json' };
        if (adminToken) headers['X-Admin-Token'] = adminToken;
        return await fetch(base() + '/api/admin/online-users', { headers }).then(r => r.json());
      } catch (e) { return { total: 0, uniqueIps: 0, users: [] }; }
    },
    async getAdminReports(adminToken) {
      if (!base()) return [];
      try {
        const headers = { 'Content-Type': 'application/json' };
        if (adminToken) headers['X-Admin-Token'] = adminToken;
        return await fetch(base() + '/api/admin/reports', { headers }).then(r => r.json());
      } catch (e) { return []; }
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
        featured: !!(r.featured || r.urgent),
        hidePhone: !!(r.hide_phone || r.hidePhone)
      }));
    }
  };
})();

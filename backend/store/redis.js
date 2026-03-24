/**
 * Redis Store - Opsiyonel
 * REDIS_URL tanımlıysa rate limit ve refresh token Redis'te saklanır
 */
let client = null;

async function getClient() {
  if (client) return client;
  const url = process.env.REDIS_URL;
  if (!url) return null;
  try {
    const Redis = require('ioredis'); // npm install ioredis
    client = new Redis(url);
    client.on('error', (e) => console.warn('Redis error:', e.message));
    return client;
  } catch (e) {
    return null;
  }
}

async function get(key) {
  const c = await getClient();
  if (!c) return null;
  const v = await c.get(key);
  return v ? JSON.parse(v) : null;
}

async function set(key, value, ttlSeconds) {
  const c = await getClient();
  if (!c) return;
  const v = JSON.stringify(value);
  if (ttlSeconds) await c.setex(key, ttlSeconds, v);
  else await c.set(key, v);
}

async function del(key) {
  const c = await getClient();
  if (!c) return;
  await c.del(key);
}

async function incr(key) {
  const c = await getClient();
  if (!c) return 0;
  return c.incr(key);
}

async function expire(key, seconds) {
  const c = await getClient();
  if (!c) return;
  await c.expire(key, seconds);
}

module.exports = { get, set, del, incr, expire, getClient };

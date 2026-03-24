/**
 * Alsat API Jest Testleri
 * npm test
 */
const request = require('supertest');

let app;
beforeAll(() => {
  process.env.DB_DRIVER = 'sqlite';
  process.env.JWT_SECRET = 'test-secret';
  process.env.NODE_ENV = 'test';
  app = require('../server');
});

describe('Alsat API', () => {
  it('GET /api/health returns status', async () => {
    const res = await request(app).get('/api/health');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('status');
  });

  it('GET /api/ads returns array or items', async () => {
    const res = await request(app).get('/api/ads');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body) || (res.body.items && Array.isArray(res.body.items))).toBeTruthy();
  });

  it('GET /api/ads?page=1&limit=5 returns paginated', async () => {
    const res = await request(app).get('/api/ads?page=1&limit=5');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('items');
    expect(res.body).toHaveProperty('page', 1);
    expect(res.body).toHaveProperty('limit', 5);
  });
});

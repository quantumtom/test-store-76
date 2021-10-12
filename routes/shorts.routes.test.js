const Router = require('./../Router');
const supertest = require('supertest');

describe('v2 shorts read one endpoint', () => {
  it('should return status 302', async () => {
    const response = await supertest(Router).get('/v2/shorts/1/');

    expect(response.status).toBe(302);
  });

  it('should return content-type JSON', async () => {
    const response = await supertest(Router).get('/v2/shorts/1/');

    expect(response.headers['content-type']).toBe("application/json; charset=utf-8");
  });
});

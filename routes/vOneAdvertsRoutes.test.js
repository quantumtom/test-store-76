const Router = require('./../Router');
const supertest = require('supertest');
const request = supertest(Router);

describe('v1 work read all endpoint', () => {
  it('should return a 302 status code', async () => {
    const response = await request.get('/v1/work/');

    expect(response.status).toBe(302);

    console.log(response.body);
  });
});


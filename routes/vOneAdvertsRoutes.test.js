const Router = require('./../Router');
const supertest = require('supertest');
const fs = require("fs");

let myData = [];

fs.readFile('./work.test.json', 'utf8',
  (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    myData = data;
  });

describe('v1 work read endpoint', () => {
  it('should return status 302', async () => {
    const response = await supertest(Router).get('/v1/work/');

    expect(response.status).toBe(302);
  });

  it('should return content-type JSON', async () => {
    const response = await supertest(Router).get('/v1/work/');

    expect(response.headers['content-type']).toBe("application/json; charset=utf-8");
  });

  it('should return the correct data', async () => {
    const response = await supertest(Router).get('/v1/work/');

    expect(response.body).toEqual(JSON.parse(myData));
  });
});

describe('v1 work write endpoint', () => {
  it('should return the correct data', async () => {
    await supertest(Router).post('/v1/work/create')
      .send(JSON.stringify(myData))
      .expect(200)
      .then(async (response) => {
        expect(response).toEqual('v1 work write endpoint functional.');
      })

  });
});


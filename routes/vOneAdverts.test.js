const Router = require('../Router');
const supertest = require('supertest');
const fs = require("fs");
const path = require("path")
const filePath = path.resolve(__dirname, '../work.test.json');
const contentType = "application/json; charset=utf-8";

let simulata = [];

fs.readFile(filePath, 'utf8',
  (err, store) => {
    if (err) {
      console.error(err);
      return err;
    }

    simulata = JSON.parse(store);
  });

describe('v1 work GET (read) endpoint', () => {
  it('should return status code 302', async () => {
    await supertest(Router)
      .get('/v1/work/')
      .expect(302)
      .then(async (response) => {
        const payload = JSON.parse(response.body);
        expect(response.headers['content-type']).toBe(contentType);
        expect(payload.data).toBeTruthy();
        expect(payload.data).toStrictEqual(simulata.data);
      })
  });
});


describe('v1 work POST (write) endpoint', () => {
  it(`should respond with status code 200.`, async () => {
    await supertest(Router)
      .post('/v1/work/create/')
      .send(simulata)
      .expect(200)
      .set('Accept', 'application/json')
      .then(async (response) => {
        expect(response.headers['content-type']).toBe(contentType);
        expect(response.body).toBeTruthy();
        expect(response.body).toStrictEqual(simulata);
      })
  })
});

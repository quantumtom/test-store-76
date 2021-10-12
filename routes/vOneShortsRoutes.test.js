const Router = require('./../Router');
const supertest = require('supertest');
const fs = require("fs");

let myData = {};

fs.readFile('./shorts.json', 'utf8',
  (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    myData = JSON.parse(data);
  });

describe('v1 shorts read-all endpoint', () => {
  it('should return status 302', async () => {
    const response = await supertest(Router).get('/v1/shorts/');

    expect(response.status).toBe(302);
  });

  it('should return content-type JSON', async () => {
    const response = await supertest(Router).get('/v1/shorts/');

    expect(response.headers['content-type']).toBe("application/json; charset=utf-8");
  });

  it('should return the correct data', async () => {
    const response = await supertest(Router).get('/v1/shorts/');

    expect(response.body).toEqual(myData);
  });
});


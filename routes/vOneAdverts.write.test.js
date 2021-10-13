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
  it('should return response status 200', async () => {
    const response = await supertest(Router).post('/v1/work/create');

    expect(response.status).toBe(200);
  });

  it('should return content-type \'text/plain\'', async () => {
    const response = await supertest(Router).post('/v1/work/create');

    expect(response.headers['content-type']).toBe("text/plain; charset=utf-8");
  });

  it('should accept a valid JSON payload', async () => {
    const response = await supertest(Router).post('/v1/work/create', myData)
      .expect(200)
      // .then((response) => {
      //   console.log(response.status)
      //   expect(response.status).toBe('v1 work write endpoint functional.');
      // })
  });
});

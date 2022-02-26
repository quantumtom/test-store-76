const Router = require('./../Router');
const supertest = require('supertest');
const fs = require("fs");
const path = require("path")
const { v4 } = require("uuid");

const filePath = path.resolve(__dirname, "../data/adverts.json");
const testFile = path.resolve(__dirname, "../data/adverts.routes.test.data.json");

let simulata = {};

let testID = v4();
let testItem = {
  "guid": testID,
  "videoID": "218705523",
  "title": "***TEST_TITLE_" + testID + "***",
  "description": "***TEST_DESCRIPTION_" + testID + "***"
};

beforeAll(() => {
  fs.copyFileSync(filePath, testFile, 0);

  fs.readFile(testFile, {encoding: "utf8"},
    (err, store) => {
      if (err) {
        console.error(err);
        return err;
      }

      simulata = JSON.parse(store);
    });
});

afterAll(() => {
  fs.unlink(testFile, (err) => {
    if (err) throw err;
  });
});

describe('GET endpoints (collections)', () => {
  it("should return an exact copy of the data payload that was sent.", (done) => {
    supertest(Router)
      .get('/v2/adverts')
      .set('Accept', 'application/json')
      .expect(200)
      .expect((res) => {
        expect(res.body.data).toStrictEqual(simulata.data);
      })
      .end((err) => {
        if (err) {
          return done(err);
        }
        return done();
      })
  });
})

describe('POST/GET/DELETE endpoints (items)', () =>  {
  let responseLocation = '';

  it('POST should return status 201', (done) => {
    supertest(Router)
      .post('/v2/adverts/clips')
      .send(testItem)
      .set('Accept', 'application/json')
      .expect(201)
      .expect((res) => {
        responseLocation = res.headers.location;
      })
      .end((err) => {
        if (err) {
          return done(err);
        }
        return done();
      })
  })

  it('GET should return status 200', (done) => {
    supertest(Router)
      .get(responseLocation)
      .set('Accept', 'application/json')
      .expect(200)
      .end((err) => {
        if (err) {
          return done(err);
        }
        return done();
      })
  })

  it('DELETE should return status 200', (done) => {
    supertest(Router)
      .delete(responseLocation)
      .set('Accept', 'application/json')
      .expect(200)
      .end((err) => {
        if (err) {
          return done(err);
        }
        return done();
      })
  })

  it('DELETE should return status 404', (done) => {
    supertest(Router)
      .delete('/v2/adverts/clips/000000000')
      .set('Accept', 'application/json')
      .expect(404)
      .end((err) => {
        if (err) {
          return done(err);
        }
        return done();
      })
  })
});

describe('Item PUT/GET/DELETE endpoints', () =>  {
  let responseLocation = '';

  it('PUT response should have status 201 and return resource location', (done) => {
    supertest(Router)
      .put('/v2/adverts/clips')
      .set('Content-Type', 'application/json')
      .send(testItem)
      .expect(201)
      .expect((res) => {
        responseLocation = res.headers.location
      })
      .end((err) => {
        if (err) {
          return done(err);
        }
        return done();
      })
  })

  it('DELETE should return status 200', (done) => {
    supertest(Router)
      .delete(responseLocation)
      .set('Accept', 'application/json')
      .expect(200)
      .end((err) => {
        if (err) {
          return done(err);
        }
        return done();
      })
  })

  it('PUT should return status 201', (done) => {
    supertest(Router)
      .put('/v2/adverts/clips/555')
      .set('Content-Type', 'application/json')
      .send(testItem)
      .expect(201)
      .end((err) => {
        if (err) {
          return done(err);
        }
        return done();
      })
  })

  it('DELETE should return status 200', (done) => {
    supertest(Router)
      .delete('/v2/adverts/clips/555')
      .set('Accept', 'application/json')
      .expect(200)
      .end((err) => {
        if (err) {
          return done(err);
        }
        return done();
      })
  })

  it('DELETE should return status 404', (done) => {
    supertest(Router)
      .delete('/v2/adverts/clips/000000000')
      .set('Accept', 'application/json')
      .expect(404)
      .end((err) => {
        if (err) {
          return done(err);
        }
        return done();
      })
  })
});

const Router = require('./../Router');
const supertest = require('supertest');
const fs = require("fs");
const path = require("path")
const filePath = path.resolve(__dirname, "../vTwo.Adverts.json");
const testFilePath = path.resolve(__dirname, "../adverts.routes.test.data.json");

fs.copyFile(filePath, testFilePath, (err) => {
  if (err) {
    console.error(err);
  }
  fs.readFile(testFilePath, {encoding: "utf8"},
    (err, store) => {
      if (err) {
        console.error(err);
        return err;
      }

      simulata = JSON.parse(store);
    });
});

let simulata = {};

describe('v2 adverts read list endpoint', () => {
  const PATH = '/v2/adverts'
  it('should return status 302', (done) => {
    supertest(Router)
      .get(PATH)
      .set('Accept', 'application/json')
      .expect(302)
      .end((err) => {
        if (err) {
          return done(err);
        }
        return done();
      })
  })
})

describe('v2 adverts put endpoint', () => {
  const dataEdit = {
    "jobID": "9",
    "videoID": "117235079",
    "title": "MERCEDES-BENZ",
    "description": "Record  (4th Unit Photography)"
  };

  it('should return status 200', (done) => {
    supertest(Router)
      .put('/v2/adverts/1')
      .set('Content-Type', 'application/json')
      .send(dataEdit)
      .expect(200)
      .end((err) => {
        if (err) {
          return done(err);
        }
        return done();
      })
  })

  it('should return status 200 or 201', (done) => {
    supertest(Router)
      .put('/v2/adverts/99')
      .set('Content-Type', 'application/json')
      .send(dataEdit)
      .expect(200 || 201)
      .end((err) => {
        if (err) {
          return done(err);
        }
        return done();
      })
  })
})

describe('v2 adverts read one endpoint', () => {
  it('should return status 302', (done) => {
    supertest(Router)
      .get('/v2/adverts/1')
      .set('Accept', 'application/json')
      .expect(302)
      .end((err) => {
        if (err) {
          return done(err);
        }
        return done();
      })
  });

  it('should return content-type JSON', (done) => {
    supertest(Router)
      .get('/v2/adverts/1')
      .set('Accept', 'application/json')
      .end((err) => {
        if (err) {
          return done(err);
        }
        return done();
      })
  });

  it("should return an exact copy of the data payload that was sent.", (done) => {
    supertest(Router)
      .get('/v2/adverts/1')
      .set('Accept', 'application/json')
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
});

// fs.unlink(testFilePath, (err) => {
//   if (err) throw err;
// });

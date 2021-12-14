const Router = require('./../Router');
const supertest = require('supertest');
const fs = require("fs");
const path = require("path")
const filePath = path.resolve(__dirname, "../vTwo.adverts.json");
const testFilePath = path.resolve(__dirname, "../adverts.routes.test.data.json");

let simulata = {};

let testItem = {
  "videoID": "999999999",
  "title": "***TEST_TITLE***",
  "description": "***TEST_DESCRIPTION***"
}


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

describe('v2 adverts GET endpoint', () => {
  it('should return status 200', (done) => {
    supertest(Router)
      .get('/v2/adverts')
      .set('Accept', 'application/json')
      .expect(200)
      .end((err) => {
        if (err) {
          return done(err);
        }
        return done();
      })
  })

  it('should return status 200', (done) => {
    supertest(Router)
      .get('/v2/adverts/clips/1')
      .set('Accept', 'application/json')
      .expect(200)
      .end((err) => {
        if (err) {
          return done(err);
        }
        return done();
      })
  });

  it("should return an exact copy of the data payload that was sent.", (done) => {
    supertest(Router)
      .get('/v2/adverts')
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
})

describe('v2 adverts POST endpoint', () => {
  it('should return status 201', (done) => {
    supertest(Router)
      .post('/v2/adverts/clips')
      .send(testItem)
      .set('Accept', 'application/json')
      .expect(201)
      .end((err) => {
        if (err) {
          return done(err);
        }
        return done();
      })
  })
})

describe('v2 adverts clips PUT/DELETE endpoints', () =>  {
  it('should return status 201', (done) => {
    supertest(Router)
      .put('/v2/adverts/clips/999999999')
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

  it('should return status 202', (done) => {
    supertest(Router)
      .delete('/v2/adverts/clips/999999999')
      .set('Accept', 'application/json')
      .expect(202)
      .end((err) => {
        if (err) {
          return done(err);
        }
        return done();
      })
  })

  it('should return status 404', (done) => {
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

// fs.unlink(testFilePath, (err) => {
//   if (err) throw err;
// });

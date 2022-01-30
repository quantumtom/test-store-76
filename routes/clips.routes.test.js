const Router = require('./../Router');
const supertest = require('supertest');
const fs = require("fs");
const path = require("path")
const { v4 } = require("uuid");

const filePath = path.resolve(__dirname, "../data/adverts.json");
const testFile = "adverts.routes.test.data.json;"

let simulata = {};

let testItem = {
  "guid": v4,
  "videoID": "999999999",
  "title": "***TEST_TITLE***",
  "description": "***TEST_DESCRIPTION***"
};

fs.copyFileSync(filePath, testFile, 0);

fs.readFile(testFile, {encoding: "utf8"},
  (err, store) => {
    if (err) {
      console.error(err);
      return err;
    }

    simulata = JSON.parse(store);
  });

describe('Adverts collection GET endpoint', () => {
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

describe('Adverts item POST endpoint', () => {
  let payloadID = '';

  it('should return status 201', (done) => {
    supertest(Router)
      .post('/v2/adverts/clips')
      .send(testItem)
      .set('Accept', 'application/json')
      .expect(201)
      .expect((res) => {
        payloadID = res.body.guid;
      })
      .end((err) => {
        if (err) {
          return done(err);
        }
        return done();
      })
  })

  it('should return status 200', (done) => {
    supertest(Router)
      .delete('/v2/adverts/clips/' + payloadID)
      .set('Accept', 'application/json')
      .expect(200)
      .end((err) => {
        if (err) {
          return done(err);
        }
        return done();
      })
  })
})

describe('v2 adverts item PUT/DELETE endpoints', () =>  {
  let payloadID = '';

  it('should return status 201', (done) => {
    supertest(Router)
      .put('/v2/adverts/clips')
      .set('Content-Type', 'application/json')
      .send(testItem)
      .expect(201)
      .expect((res) => {
        payloadID = res.body.guid;
      })
      .end((err) => {
        if (err) {
          return done(err);
        }
        return done();
      })
  })

  it('should return status 200', (done) => {
    supertest(Router)
      .delete('/v2/adverts/clips/' + payloadID)
      .set('Accept', 'application/json')
      .expect(200)
      .end((err) => {
        if (err) {
          return done(err);
        }
        return done();
      })
  })

  it('should return status 201', (done) => {
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

  it('should return status 200', (done) => {
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

fs.unlink(testFile, (err) => {
  if (err) throw err;
});

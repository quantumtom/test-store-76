const Router = require('./../Router');
const supertest = require('supertest');
const fs = require("fs");
const path = require("path")
const filePath = path.resolve(__dirname, "../vTwo.Adverts.json");

let simulata = {};

(() => {
  fs.readFileSync(filePath, {encoding: "utf8"},
    (err, store) => {
      if (err) {
        console.error(err);
        return err;
      }

      simulata = JSON.parse(store);
    });
})();

describe('v2 adverts read list endpoint', () => {
  it('should return status 302', (done) => {
    supertest(Router)
      .get('/v2/adverts/')
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

describe('v2 adverts read one endpoint', () => {
  it('should return status 302', (done) => {
    supertest(Router)
      .get('/v2/adverts/1/')
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
      .get('/v2/adverts/1/')
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
      .get('/v2/adverts/1/')
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

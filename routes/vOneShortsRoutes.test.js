const Router = require("../Router");
const supertest = require("supertest");
const fs = require("fs");
const path = require("path")
const filePath = path.resolve(__dirname, "../shorts.json");

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

describe("v1 work GET (read) endpoint", () => {
  it("should return status code 302", (done) => {
    supertest(Router)
      .get("/v1/shorts/")
      .set('Accept', 'application/json')
      .expect(302)
      .expect('Content-Type', /json/)
      .end((err) => {
        if (err) {
          return done(err);
        }
        return done();
      })
  });

  it("should have its 'Content-Type' header set to 'json'.", (done) => {
    supertest(Router)
      .get("/v1/shorts/")
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .end((err) => {
        if (err) {
          return done(err);
        }
        return done();
      })
  });

  it("should return an exact copy of the data payload that was sent.", (done) => {
    supertest(Router)
      .get("/v1/shorts/")
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

describe("v1 work POST (write) endpoint", () => {
  it(`should respond with status code 200.`, (done) => {
    supertest(Router)
      .post("/v1/shorts/create/")
      .set("Accept", "application/json")
      .send(simulata)
      .expect(200)
      .expect('Content-Type', /json/)
      .expect((res) => {
        expect(res.body.data).toStrictEqual(simulata.data);
      })
      .end((err) => {
        if (err) {
          return done(err);
        }
        return done();
      })
  })

  it(`should have its 'Content-Type' header set to 'json'.`, (done) => {
    supertest(Router)
      .post("/v1/shorts/create/")
      .set("Accept", "application/json")
      .send(simulata)
      .expect('Content-Type', /json/)
      .end((err) => {
        if (err) {
          return done(err);
        }
        return done();
      })
  })

  it(`should return an exact copy of the data payload that was sent.`, (done) => {
    supertest(Router)
      .post("/v1/shorts/create/")
      .set("Accept", "application/json")
      .send(simulata)
      .expect((res) => {
        expect(res.body.data).toStrictEqual(simulata.data);
      })
      .end((err) => {
        if (err) {
          return done(err);
        }
        return done();
      })
  })
});

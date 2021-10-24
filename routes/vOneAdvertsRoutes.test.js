const Router = require("../Router");
const supertest = require("supertest");
const fs = require("fs");
const path = require("path")
const filePath = path.resolve(__dirname, "../work.test.json");

let simulata = {};

(() => {
  fs.readFile(filePath, {encoding: "utf8"},
    (err, fileData) => {
      if (err) {
        console.error(err);
        return err;
      }

      simulata = JSON.parse(fileData);
    });
})();

describe("v1 work GET (read) endpoint", () => {
  it("should return status code 302", (done) => {
    supertest(Router)
      .get("/v1/work/")
      .set('Accept', 'application/json')
      .expect(302)
      .end((err) => {
        if (err) {
          return done(err);
        }
        return done();
      })
  });

  it("should have its 'Content-Type' header set to 'json'.", (done) => {
    supertest(Router)
      .get("/v1/work/")
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
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
      .post("/v1/work/create/")
      .set("Accept", "application/json")
      .send(simulata)
      .expect(200)
      .end((err) => {
        if (err) {
          return done(err);
        }
        return done();
      })
  })

  it(`should have its 'Content-Type' header set to 'json'.`, (done) => {
    supertest(Router)
      .post("/v1/work/create/")
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
      .post("/v1/work/create/")
      .set("Accept", "application/json")
      .send(simulata)
      .expect((res) => {
        expect(JSON.parse(res.body)).toStrictEqual(simulata);
      })
      .end((err) => {
        if (err) {
          return done(err);
        }
        return done();
      })
  })
});

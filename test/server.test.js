process.env.NODE_ENV = "test";

const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../server.js");
const expect = chai.expect;
const config = require("../knexfile")["test"];
const database = require("knex")(config);
chai.use(chaiHttp);

describe("Server file", () => {
  beforeEach(() =>
    database.migrate
      .rollback()
      .then(() => database.migrate.latest())
      .then(() => database.seed.run())
  );

  describe("/api/v1/cities", () => {
    it("should return return status of 200 on a get request", done => {
      chai
        .request(app)
        .get("/api/v1/cities")
        .end((error, response) => {
          expect(response).to.have.status(200);
          done();
        });
    });

    it("should return an array of cities", done => {
      chai
        .request(app)
        .get("/api/v1/cities")
        .end((error, response) => {
          expect(response.body[0].city).to.equal("Denver");
          expect(response.body[1].city).to.equal("New York City");
          expect(response.body[2].city).to.equal("Austin");
          done();
        });
    });

    it("should return requested city based off of search query", done => {
      chai
        .request(app)
        .get("/api/v1/cities?city=Austin")
        .end((error, response) => {
          expect(response.body[0].city).to.equal("Austin");
          done();
        });
    });

    it("should return empty array if the search query is not included in the database", done => {
      chai
        .request(app)
        .get("/api/v1/cities?city=Williamsport")
        .end((error, response) => {
          expect(response.body).to.deep.equal([]);
          done();
        });
    });

    it("should post a new city", done => {
      const newCity = {
        id: 4,
        city: "Tulsa",
        state: "OK",
        primary_airport: "Tulsa Airport",
        population: 2,
        tourism_website: "www.tulsaisawesome.com"
      };

      chai
        .request(app)
        .post("/api/v1/cities")
        .send(newCity)
        .end((error, response) => {
          expect(response).to.have.status(201);
          expect(response.body.id).to.equal(4);
          done();
        });
    });

    it("should error is a required param is missing", done => {
      const newCity = {
        id: 4,
        city: "Tulsa",
        state: "OK",
        population: 2,
        tourism_website: "www.tulsaisawesome.com"
      };

      chai
        .request(app)
        .post("/api/v1/cities")
        .send(newCity)
        .end((error, response) => {
          expect(response).to.have.status(422);
          done();
        });
    });
  });

  describe("/api/v1/cities/:id", () => {
    it("should return a status of 200 on a get request", done => {
      chai
        .request(app)
        .get("/api/v1/cities/2")
        .end((error, response) => {
          expect(response).to.have.status(200);
          done();
        });
    });

    it("should return a single city", done => {
      chai
        .request(app)
        .get("/api/v1/cities/2")
        .end((error, response) => {
          expect(response.body[0].city).to.equal("New York City");
          done();
        });
    });

    it("should be return a 204 status on successful PATCH request", done => {
      const expected = `City 2's website has been updated to www.ben.com`;

      chai
        .request(app)
        .patch("/api/v1/cities/2")
        .send({ tourism_website: "www.ben.com" })
        .end((error, response) => {
          expect(response).to.have.status(201);
          expect(response.body).to.equal(expected);
          done();
        });
    });

    it("should return 415 status updatable field is not changed", done => {
      chai
        .request(app)
        .patch("/api/v1/cities/2")
        .send({ city: "Ben" })
        .end((error, response) => {
          expect(response).to.have.status(415);
          done();
        });
    });
  });

  describe("/api/v1/comedy_clubs", () => {
    it("should return a status of 200 with a get request", done => {
      chai
        .request(app)
        .get("/api/v1/comedy_clubs")
        .end((error, response) => {
          expect(response).to.have.status(200);
          done();
        });
    });

    it("should return array of comedy clubs", done => {
      chai
        .request(app)
        .get("/api/v1/comedy_clubs")
        .end((error, response) => {
          expect(response.body[0].name).to.equal("Denver Comedy");
          expect(response.body[1].name).to.equal("Other Denver Comedy");
          expect(response.body[2].name).to.equal("NYC Comedy");
          expect(response.body[3].name).to.equal("Austin Comedy");
          expect(response.body[4].name).to.equal("Texas Comedy");
          done();
        });
    });

    it("should post a new comedy club", done => {
      let newClub = {
        id: 6,
        name: "The New Club",
        street_address: "545 Something St.",
        zip_code: 88099,
        rating: 0,
        city_id: 3
      };

      chai
        .request(app)
        .post("/api/v1/cities/3/comedy_clubs")
        .send(newClub)
        .end((error, response) => {
          expect(response).to.have.status(201);
          expect(response.body[0]).to.equal(6);
          done();
        });
    });

    it("should error with 422 if a required param is missing", done => {
      let newClub = {
        id: 6,
        name: "The New Club",
        zip_code: 88099,
        rating: 0,
        city_id: 3
      };

      chai
        .request(app)
        .post("/api/v1/cities/3/comedy_clubs")
        .send(newClub)
        .end((error, response) => {
          expect(response).to.have.status(422);
          done();
        });
    });
  });

  describe("/api/v1/comedy_clubs/:club_id", () => {
    it("should return status of 200 on successful GET request", done => {
      chai
        .request(app)
        .get("/api/v1/comedy_clubs/3")
        .end((error, response) => {
          expect(response).to.have.status(200);
          done();
        });
    });

    it("should return one comedy club", done => {
      chai
        .request(app)
        .get("/api/v1/comedy_clubs/3")
        .end((error, response) => {
          expect(response.body[0].name).to.equal("NYC Comedy");
          done();
        });
    });

    it("should return status of 204 of PATCH request successful", done => {
      const expected = `Club 5's rating has been updated to 4`;
      chai
        .request(app)
        .patch("/api/v1/comedy_clubs/5")
        .send({ rating: 4 })
        .end((error, response) => {
          expect(response).to.have.status(201);
          expect(response.body).to.equal(expected);
          done();
        });
    });

    it("should return status of 415 if required param is missing", done => {
      chai
        .request(app)
        .patch("/api/v1/comedy_clubs/5")
        .send({ name: "Ben" })
        .end((error, response) => {
          expect(response).to.have.status(415);
          done();
        });
    });
  });

  describe("/api/v1/cities/:city_id/comedy_clubs/:club_id", () => {
    it("should return status of 202 upon successful delete", done => {
      chai
        .request(app)
        .delete("/api/v1/cities/1/comedy_clubs/2")
        .end((error, response) => {
          expect(response).to.have.status(202);
          done();
        });
    });

    it("should delete specified club", done => {
      chai
        .request(app)
        .delete("/api/v1/cities/1/comedy_clubs/2")
        .end((error, response) => {
          expect(response.body).to.equal("2");
          done();
        });
    });
  });
});

process.env.NODE_ENV = 'test'

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server.js');
const expect = chai.expect
const config = require('../knexfile')['test']
const database = require('knex')(config)
chai.use(chaiHttp)


describe('Server file', () => {

  beforeEach(() => database.migrate.rollback()
    .then(() => database.migrate.latest())
    .then(() => database.seed.run())
  );

  describe('/api/v1/cities', () => {
    
    it('should return return status of 200 on a get request', (done) => {
      chai.request(app)
        .get('/api/v1/cities')
        .end((error, response) => {
          expect(response).to.have.status(200)
          done()
        })
    })

    it('should return an array of cities', (done) => {

      chai.request(app)
        .get('/api/v1/cities')
        .end((error, response) => {
          expect(response.body.length).to.equal(3)
          done()
        })
    })

    it('should post a new city', (done) => {
      const newCity = { id: 4, city: 'Tulsa', state: 'OK', primary_airport: 'Tulsa Airport', population: 2, tourism_website: 'www.tulsaisawesome.com' }

      chai.request(app)
        .post('/api/v1/cities')
        .send(newCity)
        .end((error, response) => {
          expect(response).to.have.status(201)
          expect(response.body.id).to.equal(4)
          done()
        })
    })

    it('should error is a required param is missing', (done) => {
      const newCity = { id: 4, city: 'Tulsa', state: 'OK', population: 2, tourism_website: 'www.tulsaisawesome.com' }

      chai.request(app)
        .post('/api/v1/cities')
        .send(newCity)
        .end((error, response) => {
          expect(response).to.have.status(422)
          done()
        })
    })
  })

  describe('/api/v1/cities/:id', () => {
    
    it('should return a status of 200 on a get request', (done) => {
      chai.request(app)
        .get('/api/v1/cities/2')
        .end((error, response) => {
          expect(response).to.have.status(200)
          done()
        })
    })

    it('should return a single city', (done) => {
      chai.request(app)
        .get('/api/v1/cities/2')
        .end((error, response) => {
          expect(response.body[0].city).to.equal('New York City')
          done()
        })
    })
  })

  describe('/api/v1/comedy_clubs', () => {
    
    it('should return a status of 200 with a get request', (done) => {
        chai.request(app)
          .get('/api/v1/comedy_clubs')
          .end((error, response) => {
            expect(response).to.have.status(200)
            done()
          })
    })

    it('should return array of comedy clubs', (done) => {
      chai.request(app)
        .get('/api/v1/comedy_clubs')
        .end((error, response) => {
          expect(response.body.length).to.equal(5)
          done()
        })
    })

    it('should post a new comedy club', (done) => {
      let newClub = { id: 6, name: 'The New Club', street_address: '545 Something St.', zip_code: 88099, rating: 0, city_id: 3 }

      chai.request(app)
        .post('/api/v1/cities/3/comedy_clubs')
        .send(newClub)
        .end((error, response) => {
          expect(response).to.have.status(201)
          expect(response.body[0]).to.equal(6)
          done()
        })
    })

    it('should error with 422 if a required param is missing', (done) => {
      let newClub = { id: 6, name: 'The New Club', zip_code: 88099, rating: 0, city_id: 3 }

      chai.request(app)
        .post('/api/v1/cities/3/comedy_clubs')
        .send(newClub)
        .end((error, response) => {
          expect(response).to.have.status(422)
          done()
        })
    })
  })

  describe('/api/v1/cities/:city_id/comedy_clubs/:club_id', () => {
    
    it('should return status of 202 upon successful delete', (done) => {
        chai.request(app)
          .delete('/api/v1/cities/1/comedy_clubs/2')
          .end((error, response) => {
            expect(response).to.have.status(202)
            done()
          })
    })

    it('should delete specified club', (done) => {
      chai.request(app)
        .delete('/api/v1/cities/1/comedy_clubs/2')
        .end((error, response) => {
          expect(response.body).to.equal('2')
          done()
        })
    })
  })
})

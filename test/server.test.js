const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server.js');
const cities = require('../data/citiesdata.js');
const expect = chai.expect
chai.use(chaiHttp)


describe('Server file', () => {
    it('should get our data', (done) => {
       console.log(clubArray()) 
    })
})

const request = require('supertest');
const {expect} = require('chai')

const db = require("../db");
const app = require("../")

beforeEach(async () => {
  await db.sync({ force: true });
})

it("Creates a user using the API", (done) => {
  request(app)
    .post("/auth/signup")
    .send({
      firstName: 'John',
      lastName: 'Doe',
      email: 'johndoe@gmail.com',
      password: '12345'
    })
    .expect(200)
    .end((err, res) => {
      const resJson = JSON.parse(res.text)
      if (err) {
        return done(err);
      }
      expect(resJson.firstName).to.be.equal('John');
      expect(resJson.lastName).to.be.equal('Doe');
      expect(resJson.email).to.be.equal('johndoe@gmail.com');
      return done();
    })
})
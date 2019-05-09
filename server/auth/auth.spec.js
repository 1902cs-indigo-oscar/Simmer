const request = require('supertest-session');
const {expect} = require('chai')

const db = require("../db");
const app = require("../")

describe('User created using the /signup route', () => {

  let authenticatedSession = null

  beforeEach("Returns a user created using the API", (done) => {
    db.sync({ force: true }).then(() => {
      let session = request(app)
      session
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
          authenticatedSession = session
          return done();
        })
    })
  })

  it("Returns a status indicating the user is logged in", (done) => {
    authenticatedSession
      .get("/auth/me")
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

})


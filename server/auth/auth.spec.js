const request = require('supertest-session');
const { expect } = require('chai');

const db = require('../db');
const app = require('../');

describe('User created using the /signup route', () => {
  let authenticatedSession = null;

  beforeEach('Returns a user created using the API', done => {
    db.sync({ force: true }).then(() => {
      let session = request(app);
      session
        .post('/auth/signup')
        .send({
          firstName: 'John',
          lastName: 'Doe',
          email: 'johndoe@gmail.com',
          password: '12345',
        })
        .expect(200)
        .then(res => {
          const resJSON = JSON.parse(res.text);
          expect(resJSON.firstName).to.equal('John');
          expect(resJSON.lastName).to.equal('Doe');
          expect(resJSON.email).to.equal('johndoe@gmail.com');
          authenticatedSession = session;
          return done();
        })
        .catch(err => {
          return done(err);
        });
    });
  });

  it('Returns a status indicating the user is logged in', done => {
    authenticatedSession
      .get('/auth/me')
      .expect(200)
      .then(res => {
        const resJSON = JSON.parse(res.text);
        expect(resJSON.firstName).to.equal('John');
        expect(resJSON.lastName).to.equal('Doe');
        expect(resJSON.email).to.equal('johndoe@gmail.com');
        return done();
      })
      .catch(err => {
        return done(err);
      });
  });
});

describe('A guest user', () => {
  let guestSession = request(app);

  it('should not have any indication of being logged in', done => {
    guestSession
      .get('/auth/me')
      .expect(200)
      .then(res => {
        expect(res.text).to.equal('');
        return done();
      })
      .catch(err => {
        return done(err);
      });
  });
});

describe('Logging in a user', () => {
  it('should work succesfully when given the correct credentials', done => {
    let loggedInSession = request(app);
    loggedInSession
      .post('/auth/login')
      .send({
        email: 'johndoe@gmail.com',
        password: '12345',
      })
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        const resJSON = JSON.parse(res.text);
        expect(resJSON.firstName).to.equal('John');
        expect(resJSON.lastName).to.equal('Doe');
        return done();
      });
  });

  it('should fail when given incorrect credentials', done => {
    let failSession = request(app);
    failSession
      .post('/auth/login')
      .send({
        email: 'johndoe@gmail.com',
        password: '123456',
      })
      .expect(401)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.text).to.equal('Wrong username and/or password');
        return done();
      });
  });
});

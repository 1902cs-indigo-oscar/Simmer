const request = require('supertest-session');
const { expect } = require('chai');

const db = require('../../server/db');
const app = require('../../server');

before(() => db.sync({ force: true }));

describe('Retrieving articles for a guest user', done => {
  it('should return a 401', done => {
    let guestSession = request(app);
    guestSession
      .get('/api/articles')
      .expect(401)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.text).to.equal('Unauthorized');
        return done();
      });
  });
});

describe('A logged in user', () => {
  let authenticatedSession = null;

  beforeEach('should have been signed up', done => {
    let session = request(app);
    session
      .post('/auth/signup')
      .send({
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'janesmith@gmail.com',
        password: '12345',
      })
      .expect(200)
      .then(res => {
        const resJSON = JSON.parse(res.text);
        expect(resJSON.firstName).to.equal('Jane');
        expect(resJSON.lastName).to.equal('Smith');
        expect(resJSON.email).to.equal('janesmith@gmail.com');
        authenticatedSession = session;
        return done();
      })
      .catch(err => {
        return done(err);
      });
  });

  it('should not initially be associated with any articles', done => {
    authenticatedSession
      .get('/api/articles/')
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body).to.deep.equal([]);
        return done();
      });
  });
});

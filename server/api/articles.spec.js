const request = require('supertest-session');
const { expect } = require('chai');

const db = require('../../server/db');
const app = require('../../server');

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

  before('Logs in user', done => {
    db.sync().then(() => {
      let session = request(app);
      session
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
          authenticatedSession = session;
          return done();
        });
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

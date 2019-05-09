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

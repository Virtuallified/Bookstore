var supertest = require('supertest');
var assert = require('assert')

// Write your test cases below
describe('Auth Controller', () => {

  describe('After acceptance the session cookies & CSRF token procured by GET /csrfToken :', () => {

    beforeEach(() => {
      this._url = '/login';
      return supertest(sails.hooks.http.app).get('/csrfToken')
        .then(res => {
          this._csrf = res.body._csrf
          this._cookie = res.headers['set-cookie']
        });
    });

    it('should reject requests without a CSRF token', () => {
      return supertest(sails.hooks.http.app)
        .post(this._url)
        .set('Cookie', this._cookie)
        .expect(403); // response : Forbidden
    });

    it('should reject requests without a session cookie', () => {
      return supertest(sails.hooks.http.app)
        .post(this._url)
        .set('Cookie', '')
        .set('x-csrf-token', this._csrf)
        .expect(403); // response : Forbidden
    });

    it('should reject requests with invalid cookie & tokens', () => {
      return supertest(sails.hooks.http.app)
        .post(this._url)
        .set('Cookie', 'sails.sid=foo; Path=/; HttpOnly')
        .set('X-CSRF-Token', 'foo')
        .send({
          username: 'test',
          password: 'abc123',
        })
        .expect(403); // response : Forbidden
    });

    it('should reject requests with invalid username', () => {
      return supertest(sails.hooks.http.app)
        .post(this._url)
        .set('Cookie', this._cookie)
        .set('X-CSRF-Token', this._csrf)
        .send({
          username: 'user@example.com',
          password: 'abc123'
        })
        // .expect((res) => {
        //   assert.equal(res.body.message, 'Username not found');
        //   console.log(res.body.message)
        // })
        // .expect('Username not found')
        .expect(401); // response : Unauthorized 
    });

    it('should reject requests with invalid password', () => {
      return supertest(sails.hooks.http.app)
        .post(this._url)
        .set('Cookie', this._cookie)
        .set('X-CSRF-Token', this._csrf)
        .send({
          username: 'test',
          password: 'abc'
        })
        .expect(401); // response : Unauthorized 
    });

    it('should reject put requests', () => {
      return supertest(sails.hooks.http.app)
        .put(this._url)
        .set('Cookie', this._cookie)
        .set('X-CSRF-Token', this._csrf)
        .send({
          username: 'test',
          password: 'abc123',
        })
        .expect(404); // response : Not Found
    });

    it('should login with proper credentials via post request', (done) => {
      return supertest(sails.hooks.http.app)
        .post(this._url)
        .type('form')
        .set('Cookie', this._cookie)
        .set('X-CSRF-Token', this._csrf)
        .send({
          username: 'test',
          password: 'abc123'
        })
        .expect(302, done) // response : Found (Previously "Moved temporarily")
    });

  });

  ///////////////// Prototype /////////////////
  // it('Validate', (done) => {
  //   data.username = 'admin'
  //   data.password = '123456'
  //   supertest(sails.hooks.http.app)
  //     .get('/csrfToken')
  //     .expect(200)
  //     .then((res) => {
  //       data._csrf = res.body._csrf
  //       data.cookie = res.headers['set-cookie'];
  //       console.log(JSON.stringify(data))
  //       supertest(sails.hooks.http.app)
  //         .post('/Login')
  //         .type('form')
  //         .set('Cookie', res.headers['set-cookie'])
  //         .set('X-CSRF-Token', res.body._csrf)
  //         .send(data)
  //         .expect(200)
  //         .expect('No books in Database!', done)
  //     })
  // });
  /////////////////////////////////////////////
});

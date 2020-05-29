var supertest = require('supertest');

// Write your test cases below
describe('Checking Routes : ', () => {
  //  response : OK
  it('Home', async () => await supertest(sails.hooks.http.app).get('/').expect(200));
  it('Login', async () => await supertest(sails.hooks.http.app).get('/Login').expect(200));
  it('Register', async () => await supertest(sails.hooks.http.app).get('/Register').expect(200));
  //  response : Found (Previously "Moved temporarily")
  it('Dashboard', async () => await supertest(sails.hooks.http.app).get('/Dashboard').expect(302));
});

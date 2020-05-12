const sails = require('sails');
var supertest = require('supertest');

describe('Home Controller', () => {
  describe('index', () => {
    it('should return a valid response', () =>
      supertest(sails.hooks.http.app).get('/').expect(200));
  });
});

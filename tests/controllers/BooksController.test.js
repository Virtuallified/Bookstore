var supertest = require('supertest');

// Write your test cases below
describe('Books Controller', () => {
  describe('books :', () => {
    it('Validate', async (done) => {
      await supertest(sails.hooks.http.app)
        .get('/Books')
        .expect(302)
        .expect('No books in Database!', done)
    });
  });
});

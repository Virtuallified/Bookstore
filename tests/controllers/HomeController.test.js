var supertest = require('supertest');

// Write your test cases below
describe('Home Controller', () => {
  describe('index :', () => {
    it('validate response', async () => await supertest(sails.hooks.http.app).get('/').expect(200));
  });
});

/* For testing asynchronous functions you have to close the connection by done or done() */
// Old school way
// it('should return a valid response', function (done) {
//   supertest(sails.hooks.http.app)
//     .get('/').expect(200)
//     .end(function (err, result) {
//       if (err) {
//         done(err);
//       } else {
//         done();
//       }
//     });
// });

// const sails = require('sails');
// const request = require('supertest');

// beforeAll(done => {
//   jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
//   global.app = request(sails.hooks.http.app);
//   sails.lift({
//     hooks: {
//       grunt: false,
//       orm: false
//     }
//   }, err => {

//     done(err, sails);
//   });
// });

// afterAll(sails.lower);


var sails = require('sails');
// var _ = require('lodash');

// Before running any tests...
beforeAll(function (done) {
  // Increase the Mocha timeout so that Sails has enough time to lift, even if you have a bunch of assets.
  jest.setTimeout(10000); // in milliseconds
  sails.lift({
    // Your Sails app's configuration files will be loaded automatically,
    // but you can also specify any other special overrides here for testing purposes.

    // For example, we might want to skip the Grunt hook,
    // and disable all logs except errors and warnings:
    hooks: {
      grunt: false,
      orm: false
    },
    log: {
      level: 'warn'
    },
  }, function (err) {
    if (err) {
      return done(err);
    }
    // here you can load fixtures, etc.
    // (for example, you might want to create some records in the database)
    return done();
  });
});

// After all tests have finished...
afterAll(function (done) {
  // here you can clear fixtures, etc.
  // (e.g. you might want to destroy the records you created above)
  sails.lower(done);

});

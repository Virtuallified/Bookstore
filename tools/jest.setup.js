var sails = require('sails');

// Before running any tests...
beforeAll(function (done) {
  // Increase the Mocha timeout so that Sails has enough time to lift, even if you have a bunch of assets.
  jest.setTimeout(600000); // in milliseconds
  // console.log('beforeAll')
  sails.lift({
    // Your Sails app's configuration files will be loaded automatically,
    // but you can also specify any other special overrides here for testing purposes.

    // For example, we might want to skip the Grunt hook,
    // and disable all logs except errors and warnings:
    hooks: {
      grunt: false,
      // orm: false
    },
    log: {
      level: 'warn', // silly, verbose, info, debug, warn, error
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
  // console.log('afterAll')
  sails.lower(done);
});

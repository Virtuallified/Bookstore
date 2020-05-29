/**
 * SessionHelper
 * ------------------------------------------------------------------------
 * USAGE : await sails.helpers.sessionHelper(user, session{})
 */
module.exports = {
  friendlyName: 'Session Helper',
  description: 'To make user session',
  sync: true, // See the `Synchronous helpers` documentation later in this document

  // Take inputs from helper call
  inputs: {
    user: {
      type: 'ref',
      description: 'Logged in user details',
      required: true
    },
    session: {
      type: 'ref',
      description: 'Session object',
      required: true
    }
  },

  // Output for helper
  exits: {
    success: {
      description: 'Session has been set'
    },
    error: {
      description: 'Could not find any users who logged in during the specified time frame'
    }
  },

  fn: function (inputs, exits) {
    try {
      var ssn = inputs.session;
      // If no users were found, trigger the `noUsersFound` exit.
      if (Object.keys(inputs.user).length === 0 && inputs.user.constructor === Object) {
        // throw 'error';     // Fix it
        console.log('No user found for inserting into session')
      } else {
        ssn.cookie._expires = false;
        ssn.cookie.maxAge = 60 * 60 * 1000;
        // ssn.cookie.secure = true;      // Fror connection setting for SSL, PaaS at Heroku
        ssn.authenticated = true;
        delete inputs.user.createdAt, delete inputs.user.updatedAt, delete inputs.user.password, delete inputs.user.terms_condition;
        ssn.user = inputs.user;
      }
      // Otherwise return the records through the `success` exit.
      return exits.success(ssn);
    } catch (err) {
      return exits.error(err);
    }


  },
};

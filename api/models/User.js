/**
 * User.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

const bcrypt = require('bcrypt-nodejs');
module.exports = {
  attributes: {
    username: {
      type: 'string',
      required: true
    },
    email: {
      type: 'string',
      required: true
    },
    password: {
      type: 'string',
      required: true
    },
    role: {
      type: 'string',
      required: true
    },
    terms_condition: {
      type: 'string',
      required: true
    },
    profile_id: {
      type: 'string'
    }
  },
  customToJSON: function () {
    return _.omit(this, ['password'])
  },
  beforeCreate: function (user, cb) {
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(user.password, salt, null, function (err, hash) {
        if (err) return cb(err);
        user.password = hash;
        return cb();
      });
    });
  }
};

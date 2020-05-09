/**
 * Profile.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    firstname: {
      type: 'string',
    },
    lastname: {
      type: 'string',
    },
    gender: {
      type: 'string',
    },
    road_address: {
      type: 'string',
    },
    city: {
      type: 'string',
    },
    state: {
      type: 'string',
    },
    postal_code: {
      type: 'string',
    },
    country: {
      type: 'string',
    },
    phone: {
      type: 'string',
    },
    company: {
      type: 'string',
    },
    stars: {
      type: 'number',
    },
    ip_address: {
      type: 'string',
    },
    system: {
      type: 'string',
    },
    latitude: {
      type: 'string',
    },
    longitude: {
      type: 'string',
    },
    avatar: {
      type: 'string',
    },
    ProfileOwner: {
      collection: 'User',
      via: '_ProfileID'
    }
  },
};

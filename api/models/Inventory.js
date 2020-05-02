/**
 * Inventory.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    quantityPurchased: {
      type: 'string'
    },
    quantityInStock: {
      type: 'string'
    },
    quantitySold: {
      type: 'string'
    },
    reorderStatus: {
      type: 'boolean'
    },
    status: {
      type: 'string'
    },
    Book: {
      collection: 'Books',
      via: '_Inventory'
    }
  },

};

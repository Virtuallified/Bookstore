/**
 * Books.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    book_id: {
      type: 'number',
      autoIncrement: true,
    },
    book: {
      type: 'string',
      required: true
    },
    author: {
      type: 'string'
    },
    publisher: {
      type: 'string'
    },
    isbn_10: {
      type: 'string',
      unique: true,
      required: true
    },
    isbn_13: {
      type: 'string',
    },
    price: {
      type: 'string',
      required: true
    },
    imgLink: {
      type: 'string'
    },
    genre: {
      type: 'string'
    },
    type: {
      type: 'string'
    },
    language: {
      type: 'string'
    },
    _Inventory: {
      model: 'Inventory',
      columnName: 'inventory_id',
      required: true
    }
  },

};

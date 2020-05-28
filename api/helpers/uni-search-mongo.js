/**
 * Universal Search Mongo Helper
 * ------------------------------------------------------------------------
 * USAGE : await sails.helpers.uniSearchMongo('Table', data, null, null, 'DESC')
 */
module.exports = {
  friendlyName: 'Uni Search Mongo Helper',
  description: 'Universal Search only for MongoDB/NoSQL',

  // Take inputs from helper call
  inputs: {
    modelname: {
      type: 'string',
      required: true
    },
    data: {
      type: 'ref',
      description: 'search criteria data={} object',
      required: true
    },
    // association: {
    //   type: 'string',
    //   description: 'should be the name of an assocation',
    //   allowNull: true
    // },
    projection: {
      type: 'ref',
      description: 'array[] of select fields'
    },
    // sorting: {
    //   type: 'string',
    //   description: 'ASC or DESC'
    // },
  },
  // Output for helper
  exits: {
    success: {
      description: 'Found data, and send it',
    },
    error: {
      description: 'Something wrong with Universal Search Mongo Helper logic'
    }
  },

  fn: async function (inputs, exits) {
    delete inputs.data._csrf;
    try {
      /*  Since the db connection manager exposed by `sails-mongo` is actually
        the same as the Mongo client's `db` instance, we can treat it as such.
        Get access to the native MongoDB client via the default Sails datastore */

      // var db = sails.getDatastore().manager;
      // db.collection('books').find({
      //   "book": {
      //     "$regex": /harry/i // Like & Case-insensitive
      //   }
      // }).project({
      //   price: 1
      // }).toArray(function (err, docs) {
      //   console.log(docs)
      // })

      // Return the records through the `success` exit.
      return exits.success(data);
    } catch (err) {
      return exits.error(err);
    }
  }
};

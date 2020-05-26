/**
 * Universal Search Helper
 */
module.exports = {
  friendlyName: 'Uni Search',
  description: 'Universal Search Helper',

  // Take inputs from helper call
  inputs: {
    modelName: {
      type: 'string',
      required: true
    },
    data: {
      type: 'ref',
      description: 'search criteria data object',
      required: true
    },
    populateDoc: {
      type: 'string',
      description: 'should be the name of an assocation',
      allowNull: true
    },
    projection: {
      type: 'ref',
      description: 'array of select fields'
    },
    sorting: {
      type: 'string',
      description: 'ASC or DESC'
    },
  },
  // Output for helper
  exits: {
    success: {
      description: 'Found data, and send it',
    },
    error: {
      description: 'Something wrong with Universal Search Helper logic'
    }
  },

  fn: async function (inputs, exits) {
    try {
      (!inputs.sorting) ? inputs.sorting = 'DESC': inputs.sorting
      // Run the query
      if (inputs.projection !== null && inputs.projection !== undefined && inputs.populateDoc !== null && inputs.populateDoc !== undefined) {
        // With all parameters
        var data = await eval(inputs.modelName).find({
            where: inputs.data,
            select: inputs.projection
          })
          .populate(inputs.populateDoc)
          .sort('id ' + inputs.sorting)
      } else if ((!inputs.projection || inputs.projection === null) && inputs.populateDoc !== undefined && inputs.populateDoc !== null) {
        // Without projection
        var data = await eval(inputs.modelName).find(inputs.data)
          .populate(inputs.populateDoc)
          .sort('id ' + inputs.sorting)
      } else if ((inputs.populateDoc === null || !inputs.populateDoc) && inputs.projection !== undefined && inputs.projection !== null) {
        // Without populateDoc
        var data = await eval(inputs.modelName).find({
            where: inputs.data,
            select: inputs.projection
          })
          .sort('id ' + inputs.sorting)
      } else if ((!inputs.projection || inputs.projection === null) && (inputs.populateDoc === null || !inputs.populateDoc)) {
        // Without projection & populateDoc
        var data = await eval(inputs.modelName).find(inputs.data)
          .sort('id ' + inputs.sorting)
      }

      // Return the records through the `success` exit.
      return exits.success(data);
    } catch (err) {
      return exits.error(err);
    }
  }
};

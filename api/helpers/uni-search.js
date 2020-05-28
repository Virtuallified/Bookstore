/**
 * Universal Search Helper
 * ------------------------------------------------------------------------
 * USAGE : await sails.helpers.uniSearch('Table', data, null, null, 'DESC')
 */
module.exports = {
  friendlyName: 'Uni Search',
  description: 'Universal Search Helper',

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
    association: {
      type: 'string',
      description: 'should be the name of an assocation',
      allowNull: true
    },
    projection: {
      type: 'ref',
      description: 'array[] of select fields'
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
    delete inputs.data._csrf;
    // New object from raw data, made for SQL Like operation [CASE-SENSITIVE]
    var processedData = {}
    Object.keys(inputs.data).forEach(function (item) {
      // console.log('key : ', item); // key
      // console.log('value : ', inputs.data[item]); // value
      processedData[item] = {
        contains: inputs.data[item]
      }
    });
    try {
      (!inputs.sorting) ? inputs.sorting = 'DESC': inputs.sorting
      // Run the query
      if (inputs.projection !== null && inputs.projection !== undefined && inputs.association !== null && inputs.association !== undefined) {
        // With all parameters
        var data = await eval(inputs.modelname).find({
            where: processedData,
            select: inputs.projection
          })
          .populate(inputs.association)
          .sort('id ' + inputs.sorting)
      } else if ((!inputs.projection || inputs.projection === null) && inputs.association !== undefined && inputs.association !== null) {
        // Without projection
        var data = await eval(inputs.modelname).find(processedData)
          .populate(inputs.association)
          .sort('id ' + inputs.sorting)
      } else if ((inputs.association === null || !inputs.association) && inputs.projection !== undefined && inputs.projection !== null) {
        // Without association
        var data = await eval(inputs.modelname).find({
            where: processedData,
            select: inputs.projection
          })
          .sort('id ' + inputs.sorting)
      } else if ((!inputs.projection || inputs.projection === null) && (inputs.association === null || !inputs.association)) {
        // Without projection & association
        var data = await eval(inputs.modelname).find(processedData)
          .sort('id ' + inputs.sorting)
      }

      // Return the records through the `success` exit.
      return exits.success(data);
    } catch (err) {
      return exits.error(err);
    }
  }
};

/**
 * Universal Search Helper
 * ------------------------------------------------------------------------
 * USAGE : await sails.helpers.uniSearch('Table', data, null, null, null, 'DESC')
 */
module.exports = {
  friendlyName: 'Uni Search Helper',
  description: 'Universal Search compatible for all databases supported by sails.js',

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
      description: 'array[] of select fields e.g [test1, test2]'
    },
    limitation: {
      type: 'number',
      description: 'limiting the return data',
      allowNull: true
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
      (!inputs.limitation) ? inputs.limitation = await eval(inputs.modelname).count(): inputs.limitation;
      (!inputs.sorting) ? inputs.sorting = 'DESC': inputs.sorting;
      // Run the query
      if (inputs.projection !== null && inputs.projection !== undefined && inputs.association !== null && inputs.association !== undefined) {
        // sails.log.warn('1st') // With all parameters
        var data = await eval(inputs.modelname).find({
            where: processedData,
            select: inputs.projection
          })
          .populate(inputs.association)
          .limit(inputs.limitation)
          .sort('id ' + inputs.sorting)
      } else if ((!inputs.projection || inputs.projection === null) && inputs.association !== undefined && inputs.association !== null) {
        // sails.log.warn('2nd') // Without projection
        var data = await eval(inputs.modelname).find(processedData)
          .populate(inputs.association)
          .limit(inputs.limitation)
          .sort('id ' + inputs.sorting)
      } else if ((inputs.association === null || !inputs.association) && inputs.projection !== undefined && inputs.projection !== null) {
        // sails.log.warn('3rd') // Without association
        var data = await eval(inputs.modelname).find({
            where: processedData,
            select: inputs.projection
          })
          .limit(inputs.limitation)
          .sort('id ' + inputs.sorting)
      } else if ((!inputs.projection || inputs.projection === null) && (inputs.association === null || !inputs.association)) {
        // sails.log.warn('4th') // Without projection & association
        var data = await eval(inputs.modelname).find(processedData)
          .limit(inputs.limitation)
          .sort('id ' + inputs.sorting)
      }
      // Return the records through the `success` exit.
      return exits.success(data);
    } catch (err) {
      // console.log('err : ', err)
      return exits.error(err);
    }
  }
};

/**
 * DashboardController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  index: async (req, res) => {
    var bookCount = await Books.count();
    res.view('admin/dashboard', {
      bookCount
    })
  },
};

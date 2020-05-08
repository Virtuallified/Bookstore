/**
 * HomeController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  index: (req, res) => {
    res.view('pages/home', {
      layout: 'layouts/layout-public'
    })
    // console.log(req.session)
  }
};

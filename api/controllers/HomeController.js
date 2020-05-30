/**
 * HomeController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  index: (req, res) => {
    const makeHome = async () => {
      let data = {}
      try {
        // RANDOM Answers
        data.featured = await Books.count()
          .then(count => Books.find().limit(5).skip(parseInt(Math.random() * count)))
          .then(book => book.sort(() => 0.5 - Math.random()));

        data.toprate = await Books.count()
          .then(count => Books.find().limit(5).skip(parseInt(Math.random() * count)))
          .then(book => book.sort(() => 0.5 - Math.random()));

        data.genres = await sails.helpers.uniSearch('Books', {}, null, ['genre'], 5, 'ASC')

        return res.view('pages/home', {
          data: data,
          layout: 'layouts/layout-public'
        })
        // console.log(req.session)
      } catch (err) {
        return res.view('pages/home', {
          message: 'Database connection error occured',
          layout: 'layouts/layout-public'
        })
      }
    }
    makeHome()
  }
};

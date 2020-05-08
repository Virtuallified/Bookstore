/**
 * DashboardController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  index: (req, res) => {
    res.view('admin/dashboard')
  },

  profile: function (req, res) {
    ///userId=req.session.passport;
    userDetails = req.user;
    //console.log(userDetails);
    res.view('admin/profile', {
      user: userDetails
    })
  },
  editprofile: function (req, res) {
    ///userId=req.session.passport;
    userDetails = req.user;
    //console.log(userDetails);
    res.view('admin/editProfile', {
      user: userDetails
    })
  },

  update: function (req, res) {
    //TODO: form validation here
    data = {
      username: req.body.username,
      email: req.body.email,
    }
    var ObjectId = require('mongodb').ObjectID;
    userDetails = req.user;
    console.log(userDetails.id);
    console.log(data);
    //   User.updateOne({id: userDetails.id},{$set:data},function( err, result ) {
    //     if ( err ) throw err;
    // });
    const makeUp = async () => {
      try {
        const usere = await User.update({
          id: userDetails.id
        }, {
          $set: data
        }).then(us => {
          return res.ok(us)
        })
      } catch (error) {

      }
    }
    makeUp()
      .catch(err => res.ok(err))
    // return res.redirect('/profile');

  },
};

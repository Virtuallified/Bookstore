/**
 * AuthController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const passport = require('passport');
module.exports = {
  //Login function
  login: function (req, res) {
    passport.authenticate('local', function (err, user, info) {
      if (err || !user) {
        return res.send({
          message: info.message,
          user
        });
      }

      req.login(user, function (err) {
        if (err) res.send(err);
        sails.log('User ' + user.id + ' has logged in.');
        req.session.userId = user.id;
        //res.send(req.session)
        //console.log(user.id);
        return res.redirect('/Dashboard');
      })
    })(req, res);
  },
  //Logout function
  logout: function (req, res) {
    sails.log('User ' + req.session.userId + ' has logged out.');
    req.logout();
    res.redirect('/Login');
  },
  //Register function
  register: function (req, res) {
    //TODO: form validation here
    data = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      role: req.body.role,
      terms_condition: req.body.terms
    }
    User.create(data).fetch().exec(function (err, user) {
      if (err) return res.negotiate(err);

      //TODO: Maybe send confirmation email to the user before login
      req.login(user, function (err) {
        if (err) return res.negotiate(err);
        sails.log('User ' + user.id + ' has signed in.');
        return res.redirect('/Dashboard');
      })
    })
  }
};

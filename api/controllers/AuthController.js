/**
 * AuthController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const passport = require('passport');
module.exports = {
  /**
   * `AuthController.login()`
   */
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
        sails.helpers.sessionHelper(user, req.session)
        // res.send(req.session)
        // console.log(req.session)
        return res.redirect('/Dashboard');
      })

    })(req, res);
  },

  /**
   * `AuthController.logout()`
   */
  logout: function (req, res) {
    sails.log('User ' + req.session.user.id + ' has logged out.');
    req.logout();
    req.session.destroy()
    res.redirect('/Login');
  },

  /**
   * `AuthController.register()`
   */
  register: async function (req, res) {
    //TODO: form validation here
    data = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      role: req.body.role,
      terms_condition: req.body.terms
    }
    const registration = async () => {
      try {
        const createPro = await Profile.create({
          stars: 0,
          ip_address: '0.0.0.0',
          system: 'Ubuntu',
        }).fetch()
        sails.log('profile_id is :', createPro.id);
        data._ProfileID = createPro.id;
        // sails.log(data)
        const createUse = await User.create(data).fetch().exec(function (err, user) {
          if (err) return res.serverError(err);

          //TODO: Maybe send confirmation email to the user before login
          req.login(user, function (err) {
            if (err) return res.serverError(err);
            sails.helpers.sessionHelper(user, req.session)
            sails.log('User ' + user.id + ' has signed in.');
            return res.redirect('/Dashboard');
          })
        })
      } catch (err) {
        // If user is not inserted
        try {
          Profile.destroy({
            id: data.profile_id
          }).then(
            sails.log(`profile has been successfully deleted with ID : ${inventory_id}`)
          ).catch(err => res.serverError(err))
        } catch (err) {
          throw new Error('User not created and problem occurs at deletion of profile')
        }
      }
    }
    registration()
      .catch(err => res.end(err))

  }
};

/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {


  /**
   * `UserController.profile()`
   */
  profile: async function (req, res) {
    let mongo_bookId = 0;
    if (req.isAuthenticated()) {
      mongo_bookId = req.session.user.id
    }
    const findProfile = async () => {
      try {
        const userProfile = User.findOne({
            id: mongo_bookId
          })
          .populate('_ProfileID')
          .then(user => {
            if (!user || user.length === 0) {
              throw new Error('No user details found')
            } else {
              // return res.ok(user)
              return res.view('admin/profile', {
                uDetails: user
              })
            }
          })
      } catch (error) {
        return res.status(500).send('User details not available')
      }
    }
    findProfile()
      .catch(err => res.notFound(err))
  },

  /**
   * `UserController.update()`
   */
  update: async function (req, res) {
    let mongo_bookId = req.params.id,
      // User Details Object
      userDetails = {},
      email = req.body.email,
      password = req.body.password,
      role = req.body.role;

    if (email) {
      userDetails.email = email;
    }
    // if (password) {
    //   userDetails.password = password;
    // }
    if (role) {
      userDetails.role = role;
    }
    sails.log(mongo_bookId)
    const makeUpdate = async () => {
      try {
        const usere = await User.update({
            id: mongo_bookId
          },
          userDetails
        ).then(user => {
          sails.log('user_id is : ' + mongo_bookId + ' : updated')
          // res.ok(user)
        })
      } catch (error) {
        throw error
      }
    }
    makeUpdate()
      .then(result => res.ok(result))
      .catch(err => res.end(err))
  },

};

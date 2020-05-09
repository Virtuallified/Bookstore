/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  /***************************************************************************
   *                                                                          *
   * Make the view located at `views/homepage.ejs` your home page.            *
   *                                                                          *
   * (Alternatively, remove this and add an `index.html` file in your         *
   * `assets` directory)                                                      *
   *                                                                          *
   ***************************************************************************/
  // For API's (Postman)
  /* 
  'GET /Books': 'Books.allbooks',
  'GET /Books/Show/:id': 'Books.onebook',
  'POST /Books/Create': 'Books.create',
  'PUT /Books/:id': 'Books.update',
  'DELETE /Books/:id': 'Books.delete',
   */

  // For WebApp Routing
  'GET /': 'Home.index',
  'GET /Login': {
    view: 'pages/login'
  },
  'GET /Register': {
    view: 'pages/register'
  },
  // LOGIN
  'GET /Logout': 'Auth.logout',
  'POST /Login': 'Auth.login',
  'POST /Register': 'Auth.register',
  'GET /Dashboard': 'admin/Dashboard.index',
  // USERS
  'GET /Profile': 'User.profile',
  'PUT /Profile/Update/:id': 'User.update',
  // BOOKS
  'GET /Books': 'Books.books',
  'GET /Books/Entry': 'Books.entry',
  'GET /Books/Edit/:id': 'Books.edit',
  'POST /Books/Create': 'Books.create',
  'PUT /Books/Update/:id': 'Books.update',
  'DELETE /Books/Delete/:id': 'Books.delete',
  'GET /Books/Search': 'Books.search',


  /***************************************************************************
   *                                                                          *
   * More custom routes here...                                               *
   * (See https://sailsjs.com/config/routes for examples.)                    *
   *                                                                          *
   * If a request to a URL doesn't match any of the routes in this file, it   *
   * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
   * not match any of those, it is matched against static assets.             *
   *                                                                          *
   ***************************************************************************/


};

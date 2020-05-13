/**
 * Session Configuration
 * (sails.config.session)
 *
 * Use the settings below to configure session integration in your app.
 * (for additional recommended settings, see `config/env/production.js`)
 *
 * For all available options, see:
 * https://sailsjs.com/config/session
 */

module.exports.session = {

  /***************************************************************************
   *                                                                          *
   * Session secret is automatically generated when your new app is created   *
   * Replace at your own risk in production-- you will invalidate the cookies *
   * of your users, forcing them to log in again.                             *
   *                                                                          *
   ***************************************************************************/
  secret: process.env.SESSION_SECRET,


  /***************************************************************************
   *                                                                          *
   * Customize when built-in session support will be skipped.                 *
   *                                                                          *
   * (Useful for performance tuning; particularly to avoid wasting cycles on  *
   * session management when responding to simple requests for static assets, *
   * like images or stylesheets.)                                             *
   *                                                                          *
   * https://sailsjs.com/config/session                                       *
   *                                                                          *
   ***************************************************************************/
  // isSessionDisabled: function (req){
  //   return !!req.path.match(req._sails.LOOKS_LIKE_ASSET_RX);
  // },


  /***************************************************************************   
   * MongoDB Login Session Handler                                            *
   ***************************************************************************/
  // Note: user, pass and port are optional
  // -----  LOCAL  -----
  // adapter: 'connect-mongo',
  // url: 'mongodb://localhost:27017/Bookstore',
  // collection: 'sessions',
  // auto_reconnect: false,
  // ssl: false,
  // stringify: true,
  // -----  SERVER : [MongoDB Atlas] -----   // Problem establishing with ReplicaSet with Connect-Mongo Driver, If you can, please do it and let me know.
  // adapter: 'connect-mongo',
  // url: 'mongodb://cluster-projects-shard-00-00-dnb3s.mongodb.net:27017,cluster-projects-shard-00-01-dnb3s.mongodb.net:27017,cluster-projects-shard-00-02-dnb3s.mongodb.net:27017/Bookstore',
  // collection: 'sessions',
  // auto_reconnect: false,
  // ssl: true,
  // stringify: true,

};

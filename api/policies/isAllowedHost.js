/* ************************************************ 
 * Policy for whitelisting the host               *
 * ************************************************ */
module.exports = function (req, res, next) {
  var whitelist = ['localhost', '127.0.0.1', 'bookstores-app.herokuapp.com']
  // var whitelist = 'localhost:1337'

  if (whitelist.includes(req.hostname)) {
    next();
  } else {
    res.status(401).json('Not allowed to view the website : Please re-check your policies');
  }
}

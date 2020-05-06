module.exports = function (req, res, next) {
  // var whitelist = ['localhost:1337', '127.0.0.1:1337']    // Array not working
  var whitelist = 'localhost:1337'

  if (whitelist.includes(req.hostname)) {
    next();
  } else {
    res.status(400).json('Not allowed');
  }
}

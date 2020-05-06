module.exports = (req, res, next) => {
  res.locals.flash = {};
  if (req.session.flash) return next();
  res.session.flash = _.clone(req.session.flash);
  req.session.flash = {};
  next();
}

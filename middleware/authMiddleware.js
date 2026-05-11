function requireUser(req, res, next) {
  if (!req.session.user) {
    return res.redirect('/onboarding');
  }
  next();
}

module.exports = { requireUser };

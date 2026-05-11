exports.showLanding = (req, res) => {
  if (req.session.user) return res.redirect('/dashboard');
  res.render('index', { title: 'Sightline' });
};

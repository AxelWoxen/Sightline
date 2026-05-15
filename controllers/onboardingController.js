const userModel = require('../models/userModel');

exports.showOnboarding = (req, res) => {
  res.render('onboarding', { title: 'Kom i gang' });
};

exports.createProfile = async (req, res) => {
  try {
    const user = await userModel.createUser({
      name: req.body.name,
      email: req.body.email || null,
      experience_level: req.body.experience_level,
      preferred_style: req.body.preferred_style,
      goal: req.body.goal || null,
      camera: req.body.camera || null,
      biggest_challenge: req.body.biggest_challenge || null,
    });

    req.session.user = user;
    res.redirect('/dashboard');
  } catch (error) {
    console.error('Onboarding error:', error);
    res.status(500).render('error', { title: 'Feil', message: 'Kunne ikke opprette profil.' });
  }
};

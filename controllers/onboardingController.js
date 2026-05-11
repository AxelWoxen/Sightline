const userModel = require('../models/userModel');

exports.showOnboarding = (req, res) => {
  res.render('onboarding', { title: 'Start your journey' });
};

exports.createProfile = async (req, res) => {
  try {
    const user = await userModel.createUser({
      name: req.body.name,
      email: req.body.email,
      experience_level: req.body.experience_level,
      preferred_style: Array.isArray(req.body.preferred_style)
        ? req.body.preferred_style.join(', ')
        : req.body.preferred_style,
      goal: req.body.goal,
      camera: req.body.camera,
    });

    req.session.user = user;
    res.redirect('/dashboard');
  } catch (error) {
    console.error(error);
    res.status(500).render('error', { title: 'Error', message: 'Could not create profile.' });
  }
};

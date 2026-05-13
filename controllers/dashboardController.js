const challengeModel = require('../models/challengeModel');
const photoModel = require('../models/photoModel');

exports.showDashboard = async (req, res) => {
  try {
    const challenge = await challengeModel.getTodayChallenge(req.session.user.preferred_style);
    const photos = await photoModel.getPhotosByUser(req.session.user.id);
    const latest = photos[0] || null;
    const critiquedCount = photos.filter((photo) => photo.feedback_text).length;

    res.render('dashboard', {
      title: 'Dashboard',
      challenge,
      latest,
      critiquedCount,
      photosCount: photos.length,
    });
  } catch (error) {
    console.error(error);
    res.status(500).render('error', {
      title: 'Dashboard error',
      message: 'Could not load dashboard.'
    });
  }
};

const challengeModel = require('../models/challengeModel');
const photoModel = require('../models/photoModel');

exports.showDashboard = async (req, res) => {
  const challenge = await challengeModel.getTodayChallenge();
  const photos = await photoModel.getPhotosByUser(req.session.user.id);
  const latest = photos[0] || null;
  const critiquedCount = photos.filter((p) => p.feedback_text).length;

  res.render('dashboard', {
    title: 'Dashboard',
    challenge,
    latest,
    critiquedCount,
    photosCount: photos.length,
  });
};

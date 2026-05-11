const photoModel = require('../models/photoModel');

function average(values) {
  const filtered = values.filter((v) => typeof v === 'number');
  if (!filtered.length) return 0;
  return Math.round(filtered.reduce((a, b) => a + b, 0) / filtered.length);
}

exports.showProgress = async (req, res) => {
  const photos = await photoModel.getPhotosByUser(req.session.user.id);
  const scored = photos.filter((p) => p.composition_score !== null);
  const stats = {
    photosCount: photos.length,
    averageComposition: average(scored.map((p) => p.composition_score)),
    averageLighting: average(scored.map((p) => p.lighting_score)),
    averageStorytelling: average(scored.map((p) => p.storytelling_score)),
    averageTechnical: average(scored.map((p) => p.technical_score)),
  };
  res.render('progress', { title: 'Progress', photos, stats });
};

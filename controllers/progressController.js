const photoModel = require('../models/photoModel');

function average(values) {
  const filtered = values.filter((v) => typeof v === 'number');
  if (!filtered.length) return 0;
  return Math.round(filtered.reduce((a, b) => a + b, 0) / filtered.length);
}

exports.showProgress = async (req, res) => {
  try {
    const photos = await photoModel.getPhotosByUser(req.session.user.id);
    const scored = photos.filter((p) => p.composition_score !== null);
    const stats = {
      photosCount: photos.length,
      averageComposition: average(scored.map((p) => p.composition_score)),
      averageLighting: average(scored.map((p) => p.lighting_score)),
      averageStorytelling: average(scored.map((p) => p.storytelling_score)),
      averageTechnical: average(scored.map((p) => p.technical_score)),
    };

    const focusScores = [
      { name: 'Komposisjon', value: stats.averageComposition },
      { name: 'Lys',         value: stats.averageLighting },
      { name: 'Motiv',       value: stats.averageStorytelling },
      { name: 'Timing',      value: stats.averageTechnical },
    ];

    const focusArea = focusScores.sort((a, b) => a.value - b.value)[0];

    res.render('progress', { title: 'Fremgang', photos, stats, focusArea });
  } catch (error) {
    console.error('Progress error:', error);
    res.status(500).render('error', {
      title: 'Feil',
      message: 'Kunne ikke laste fremgang.',
    });
  }
};

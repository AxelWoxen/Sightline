const challengeModel = require('../models/challengeModel');
const photoModel = require('../models/photoModel');

function average(values) {
  const filtered = values.filter((value) => typeof value === 'number');
  if (!filtered.length) return 0;
  return Math.round(filtered.reduce((sum, value) => sum + value, 0) / filtered.length);
}

function findFocusArea(photos) {
  const scored = photos.filter((photo) => photo.composition_score !== null);
  if (!scored.length) return null;

  const scores = [
    { name: 'Composition', value: average(scored.map((photo) => photo.composition_score)) },
    { name: 'Lighting', value: average(scored.map((photo) => photo.lighting_score)) },
    { name: 'Storytelling', value: average(scored.map((photo) => photo.storytelling_score)) },
    { name: 'Technical', value: average(scored.map((photo) => photo.technical_score)) }
  ];

  return scores.filter((score) => score.value > 0).sort((a, b) => a.value - b.value)[0] || null;
}

exports.listChallenges = async (req, res) => {
  try {
    const preferredStyle = req.session.user.preferred_style;
    const photos = await photoModel.getPhotosByUser(req.session.user.id);
    const focusArea = findFocusArea(photos);

    let styleChallenges = await challengeModel.getChallengesByStyle(preferredStyle);

    if (!styleChallenges || styleChallenges.length === 0) {
      styleChallenges = await challengeModel.getAllChallenges();
    }

    let recommendedChallenges = [];

    if (focusArea) {
      recommendedChallenges = await challengeModel.getChallengesByStyleAndFocus(
        preferredStyle,
        focusArea.name
      );
    }

    if (!recommendedChallenges || recommendedChallenges.length === 0) {
      recommendedChallenges = styleChallenges.slice(0, 2);
    }

    const recommendedIds = new Set(recommendedChallenges.map((challenge) => challenge.id));
    const otherChallenges = styleChallenges.filter((challenge) => !recommendedIds.has(challenge.id));

    res.render('challenges', {
      title: 'Challenges',
      challenges: styleChallenges,
      recommendedChallenges,
      otherChallenges,
      focusArea,
      preferredStyle
    });
  } catch (error) {
    console.error(error);
    res.status(500).render('error', {
      title: 'Challenges error',
      message: 'Could not load challenges.'
    });
  }
};

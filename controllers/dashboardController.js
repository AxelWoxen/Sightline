const challengeModel = require('../models/challengeModel');
const photoModel = require('../models/photoModel');
const generatedChallengeModel = require('../models/generatedChallengeModel');
const { generateChallengesForUser } = require('../services/challengeGeneratorService');

const REGEN_HOURS = 24;

function getWeakAreas(photos) {
  const scored = photos.filter(p => p.composition_score !== null).slice(0, 5);
  if (!scored.length) return [];
  const avgs = [
    { name: 'Komposisjon', val: scored.reduce((s, p) => s + p.composition_score, 0) / scored.length },
    { name: 'Lys',         val: scored.reduce((s, p) => s + p.lighting_score, 0) / scored.length },
    { name: 'Motiv',       val: scored.reduce((s, p) => s + p.storytelling_score, 0) / scored.length },
    { name: 'Timing',      val: scored.reduce((s, p) => s + p.technical_score, 0) / scored.length },
  ];
  return avgs.sort((a, b) => a.val - b.val).slice(0, 2).map(x => x.name);
}

exports.showDashboard = async (req, res) => {
  try {
    const user = req.session.user;
    const photos = await photoModel.getPhotosByUser(user.id);
    const latest = photos[0] || null;

    // Determine if generated challenges need refreshing
    let generatedChallenges = [];
    try {
      const lastGenAt = await generatedChallengeModel.getLatestGeneratedAt(user.id);
      const stale = !lastGenAt ||
        (Date.now() - new Date(lastGenAt).getTime()) > REGEN_HOURS * 3600 * 1000;

      if (stale) {
        const weaknesses = getWeakAreas(photos);
        const fresh = await generateChallengesForUser(user, weaknesses);
        await generatedChallengeModel.saveGeneratedChallenges(user.id, fresh);
        generatedChallenges = fresh;
      } else {
        generatedChallenges = await generatedChallengeModel.getGeneratedChallenges(user.id);
      }
    } catch (genErr) {
      console.error('Challenge generation failed, using static fallback:', genErr.message);
      // Fallback: 3 static challenges by style
      const fallback = await challengeModel.getChallengesByStyle(user.preferred_style);
      generatedChallenges = fallback.slice(0, 3);
    }

    // For each generated challenge, find a matching static challenge by focus_area
    // so the "Prøv denne" CTA can link to /photos/upload?challenge=<id>
    for (const gc of generatedChallenges) {
      try {
        const matches = await challengeModel.getChallengesByStyleAndFocus(
          user.preferred_style, gc.focus_area
        );
        gc.linked_challenge_id = matches.length > 0 ? matches[0].id : null;
      } catch (e) {
        gc.linked_challenge_id = null;
      }
    }

    res.render('dashboard', {
      title: 'Dashboard',
      generatedChallenges,
      latest,
    });
  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).render('error', {
      title: 'Dashboard-feil',
      message: 'Kunne ikke laste dashboard.',
    });
  }
};

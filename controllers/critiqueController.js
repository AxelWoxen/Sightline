const photoModel = require('../models/photoModel');
const critiqueModel = require('../models/critiqueModel');
const challengeModel = require('../models/challengeModel');
const generatedChallengeModel = require('../models/generatedChallengeModel');

// Map score keys to focus area names
const SCORE_TO_FOCUS = {
  composition_score: 'Komposisjon',
  lighting_score: 'Lys',
  storytelling_score: 'Motiv',
  technical_score: 'Timing',
};

exports.showCritique = async (req, res) => {
  try {
    const photo = await photoModel.getPhotoById(req.params.photoId);

    if (!photo || photo.user_id !== req.session.user.id) {
      return res.status(404).render('404', { title: 'Bilde ikke funnet' });
    }

    const critique = await critiqueModel.getCritiqueByPhotoId(photo.id);

    if (!critique) {
      return res.status(404).render('error', {
        title: 'Tilbakemelding mangler',
        message: 'AI-tilbakemelding er ikke generert ennå.',
      });
    }

    // Find weakest focus area from this critique
    let suggestedChallenge = null;
    try {
      const scoreEntries = Object.entries(SCORE_TO_FOCUS).map(([key, focus]) => ({
        focus,
        score: critique[key] || 100,
      }));
      const weakest = scoreEntries.sort((a, b) => a.score - b.score)[0];

      // Try generated challenges first, then fall back to static ones
      const generated = await generatedChallengeModel.getGeneratedChallenges(req.session.user.id);
      const fromGenerated = generated.find(c => c.focus_area === weakest.focus);

      if (fromGenerated) {
        // Find the linked static challenge ID for the upload link
        const matches = await challengeModel.getChallengesByStyleAndFocus(
          req.session.user.preferred_style, fromGenerated.focus_area
        );
        suggestedChallenge = {
          ...fromGenerated,
          linked_challenge_id: matches.length > 0 ? matches[0].id : null,
        };
      } else {
        const staticMatches = await challengeModel.getChallengesByStyleAndFocus(
          req.session.user.preferred_style, weakest.focus
        );
        if (staticMatches.length > 0) {
          suggestedChallenge = { ...staticMatches[0], linked_challenge_id: staticMatches[0].id };
        }
      }
    } catch (e) {
      console.error('Could not find suggested challenge:', e.message);
    }

    res.render('critique', {
      title: 'AI-tilbakemelding',
      photo,
      critique,
      suggestedChallenge,
    });

  } catch (error) {
    console.error('Critique controller error:', error);
    res.status(500).render('error', {
      title: 'Critique-feil',
      message: 'Kunne ikke laste tilbakemelding.',
    });
  }
};

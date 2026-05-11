const challengeModel = require('../models/challengeModel');

exports.listChallenges = async (req, res) => {
  const challenges = await challengeModel.getChallengesByStyle(
    req.session.user.preferred_style
  );

  res.render('challenges', {
    title: 'Challenges',
    challenges
  });
};
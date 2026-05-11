const challengeModel = require('../models/challengeModel');

exports.listChallenges = async (req, res) => {
  const challenges = await challengeModel.getAllChallenges();
  res.render('challenges', { title: 'Challenges', challenges });
};

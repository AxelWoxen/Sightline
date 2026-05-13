const { all, get } = require('./db');

async function getAllChallenges() {
  return all('SELECT * FROM challenges ORDER BY category ASC, id ASC');
}

async function getChallengeById(id) {
  return get('SELECT * FROM challenges WHERE id = ?', [id]);
}

async function getChallengesByStyle(preferredStyle) {
  return all(
    'SELECT * FROM challenges WHERE category = ? ORDER BY id ASC',
    [preferredStyle]
  );
}

async function getChallengesByStyleAndFocus(preferredStyle, focusArea) {
  return all(
    `SELECT *
     FROM challenges
     WHERE category = ? AND focus_area = ?
     ORDER BY difficulty ASC, id ASC`,
    [preferredStyle, focusArea]
  );
}

async function getTodayChallenge(preferredStyle) {
  const challenge = await get(
    'SELECT * FROM challenges WHERE category = ? ORDER BY RANDOM() LIMIT 1',
    [preferredStyle]
  );

  if (challenge) return challenge;

  return get('SELECT * FROM challenges ORDER BY RANDOM() LIMIT 1');
}

module.exports = {
  getAllChallenges,
  getChallengeById,
  getTodayChallenge,
  getChallengesByStyle,
  getChallengesByStyleAndFocus
};

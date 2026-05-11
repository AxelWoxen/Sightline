const { all, get } = require('./db');

async function getAllChallenges() {
  return all('SELECT * FROM challenges ORDER BY id ASC');
}

async function getChallengeById(id) {
  return get('SELECT * FROM challenges WHERE id = ?', [id]);
}

async function getTodayChallenge(preferredStyle) {
  return get(
    'SELECT * FROM challenges WHERE category = ? ORDER BY RANDOM() LIMIT 1',
    [preferredStyle]
  );
}

module.exports = { getAllChallenges, getChallengeById, getTodayChallenge };

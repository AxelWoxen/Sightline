const { all, get } = require('./db');

async function getAllChallenges() {
  return all('SELECT * FROM challenges ORDER BY id ASC');
}

async function getChallengeById(id) {
  return get('SELECT * FROM challenges WHERE id = ?', [id]);
}

async function getTodayChallenge() {
  return get('SELECT * FROM challenges ORDER BY RANDOM() LIMIT 1');
}

module.exports = { getAllChallenges, getChallengeById, getTodayChallenge };

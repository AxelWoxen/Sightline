const { run, get } = require('./db');

async function createUser({ name, email, experience_level, preferred_style, goal, camera, biggest_challenge }) {
  const result = await run(
    `INSERT INTO users (name, email, experience_level, preferred_style, goal, camera, biggest_challenge)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [name, email || null, experience_level, preferred_style, goal || null, camera || null, biggest_challenge || null]
  );
  return get('SELECT * FROM users WHERE id = ?', [result.id]);
}

async function findById(id) {
  return get('SELECT * FROM users WHERE id = ?', [id]);
}

module.exports = { createUser, findById };

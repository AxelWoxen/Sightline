const { run, get } = require('./db');

async function createUser({ name, email, experience_level, preferred_style, goal, camera }) {
  const result = await run(
    `INSERT INTO users (name, email, experience_level, preferred_style, goal, camera)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [name, email, experience_level, preferred_style, goal, camera]
  );
  return get('SELECT * FROM users WHERE id = ?', [result.id]);
}

async function findById(id) {
  return get('SELECT * FROM users WHERE id = ?', [id]);
}

module.exports = { createUser, findById };

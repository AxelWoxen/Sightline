const { run, get, all } = require('./db');

async function getGeneratedChallenges(userId) {
  return all(
    'SELECT * FROM generated_challenges WHERE user_id = ? ORDER BY id ASC',
    [userId]
  );
}

async function getLatestGeneratedAt(userId) {
  const row = await get(
    'SELECT MAX(generated_at) AS ts FROM generated_challenges WHERE user_id = ?',
    [userId]
  );
  return row ? row.ts : null;
}

async function saveGeneratedChallenges(userId, challenges) {
  await run('DELETE FROM generated_challenges WHERE user_id = ?', [userId]);
  for (const c of challenges) {
    await run(
      `INSERT INTO generated_challenges (user_id, title, description, focus_area, difficulty, why_this_challenge)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [userId, c.title, c.description, c.focus_area, c.difficulty, c.why_this_challenge || null]
    );
  }
}

module.exports = { getGeneratedChallenges, getLatestGeneratedAt, saveGeneratedChallenges };

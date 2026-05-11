const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, '..', 'db', 'sightline.sqlite');
const db = new sqlite3.Database(dbPath);

function run(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      if (err) reject(err);
      else resolve({ id: this.lastID, changes: this.changes });
    });
  });
}

function get(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
}

function all(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}

async function init() {
  await run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT,
    experience_level TEXT,
    preferred_style TEXT,
    goal TEXT,
    camera TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  await run(`CREATE TABLE IF NOT EXISTS challenges (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    category TEXT,
    difficulty TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  await run(`CREATE TABLE IF NOT EXISTS photos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    challenge_id INTEGER,
    image_path TEXT NOT NULL,
    original_name TEXT,
    caption TEXT,
    uploaded_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(user_id) REFERENCES users(id),
    FOREIGN KEY(challenge_id) REFERENCES challenges(id)
  )`);

  await run(`CREATE TABLE IF NOT EXISTS critiques (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    photo_id INTEGER NOT NULL,
    composition_score INTEGER,
    lighting_score INTEGER,
    storytelling_score INTEGER,
    technical_score INTEGER,
    feedback_text TEXT,
    next_task TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(photo_id) REFERENCES photos(id)
  )`);

  const existing = await get('SELECT COUNT(*) AS count FROM challenges');
  if (existing.count === 0) {
    const seed = [
      ['Find leading lines', 'Take one photo where roads, shadows, buildings or objects guide the eye toward a clear subject.', 'Composition', 'Easy'],
      ['Shadow story', 'Find a shadow that adds mood or mystery. Make the shadow part of the story, not just the background.', 'Light', 'Easy'],
      ['One clear subject', 'Take a photo with one obvious subject. Remove distractions by moving closer or changing angle.', 'Storytelling', 'Easy'],
      ['Reflections', 'Use water, glass or metal to create a reflection that makes the image more interesting.', 'Creativity', 'Medium'],
      ['Cinematic frame', 'Take a wide photo that feels like a still from a movie. Think mood, light and foreground.', 'Style', 'Medium']
    ];
    for (const c of seed) {
      await run('INSERT INTO challenges (title, description, category, difficulty) VALUES (?, ?, ?, ?)', c);
    }
  }
}

init().catch((err) => console.error('Database init failed:', err));

module.exports = { db, run, get, all };

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
      focus_area TEXT,
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
    feedback_what_works TEXT,
    feedback_technical TEXT,
    feedback_camera TEXT,
    feedback_next_time TEXT,
    next_task TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(photo_id) REFERENCES photos(id)
  )`);

  const existing = await get('SELECT COUNT(*) AS count FROM challenges');
  if (existing.count === 0) {
    const seed = [
      ['Foreground depth', 'Include something in the foreground to create depth in a landscape photo.', 'Landscape photography', 'Easy', 'Composition'],
      ['Golden hour layers', 'Take a landscape photo during soft light and try to separate foreground, middle ground and background.', 'Landscape photography', 'Medium', 'Lighting'],
      ['Natural leading lines', 'Use a road, river, path or mountain ridge to guide the viewer through the image.', 'Landscape photography', 'Easy', 'Composition'],
    
      ['Urban symmetry', 'Find symmetry in buildings, streets or reflections and use it as the main structure of the photo.', 'Street photography', 'Easy', 'Composition'],
      ['Shadow story', 'Find a strong shadow in the city and make it part of the story.', 'Street photography', 'Easy', 'Storytelling'],
      ['One clear subject', 'Capture one clear subject in a busy street scene. Remove distractions by changing your angle.', 'Street photography', 'Medium', 'Technical'],
    
      ['Window light', 'Take a portrait using soft natural light from a window.', 'Portrait photography', 'Easy', 'Lighting'],
      ['Subject separation', 'Create separation between the person and the background using light, distance or contrast.', 'Portrait photography', 'Medium', 'Composition'],
      ['Expression over pose', 'Take a portrait where the expression feels natural, not overly posed.', 'Portrait photography', 'Easy', 'Storytelling']
    ];
    
    for (const c of seed) {
      await run(
        'INSERT INTO challenges (title, description, category, difficulty, focus_area) VALUES (?, ?, ?, ?, ?)',
        c
      );
    }
  }
}

init().catch((err) => console.error('Database init failed:', err));

module.exports = { db, run, get, all };

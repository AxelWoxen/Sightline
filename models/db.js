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

  await run(`CREATE TABLE IF NOT EXISTS generated_challenges (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    focus_area TEXT,
    difficulty TEXT,
    why_this_challenge TEXT,
    generated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(user_id) REFERENCES users(id)
  )`);

  await run(`CREATE TABLE IF NOT EXISTS app_config (
    key TEXT PRIMARY KEY,
    value TEXT
  )`);

  // Schema migrations — silent if column already exists
  async function addCol(table, col, def) {
    try { await run(`ALTER TABLE ${table} ADD COLUMN ${col} ${def}`); } catch (e) {
      if (!e.message.includes('duplicate column')) throw e;
    }
  }
  await addCol('users', 'biggest_challenge', 'TEXT');

  // Migrate: reseed if fewer than 12 challenges (removes portrait, adds proper Landskap/Street)
  const existing = await get('SELECT COUNT(*) AS count FROM challenges');
  if (existing.count < 12) {
    await run('DELETE FROM challenges');
    const seed = [
      // Landskap — Nybegynner
      ['Finn lyset', 'Gå ut og ta ett bilde der lyset er hovedelementet — soloppgang, solnedgang, eller skyer som slipper gjennom.', 'Landskap', 'Nybegynner', 'Lys'],
      ['Noe i forgrunnen', 'Plasser noe interessant i forgrunnen for å skape dybde. En stein, en blomst, et gjerde — noe som trekker blikket inn.', 'Landskap', 'Nybegynner', 'Komposisjon'],
      // Landskap — Litt øvelse
      ['Ledende linjer', 'Bruk en vei, elv, sti eller fjellkam til å lede blikket gjennom bildet fra bunn til topp.', 'Landskap', 'Litt øvelse', 'Komposisjon'],
      ['Vent på riktig øyeblikk', 'Finn et sted og vent — ta bildet i det øyeblikket lyset forandrer seg, ikke før og ikke etter.', 'Landskap', 'Litt øvelse', 'Timing'],
      // Landskap — Klar for mer
      ['Tre lag i ett bilde', 'Ta et landskap der du tydelig kan skille forgrunn, mellomgrunn og bakgrunn. Tenk som en scenograf.', 'Landskap', 'Klar for mer', 'Komposisjon'],
      ['Stemning over motiv', 'Ta et bilde der stemningen er det viktigste — ikke stedet. Hva føles det ut som å stå akkurat der?', 'Landskap', 'Klar for mer', 'Motiv'],

      // Street — Nybegynner
      ['Ett tydelig motiv', 'Finn én ting i bybildet og gjør den til absolutt midtpunkt. Fjern distraksjoner ved å endre vinkel eller komme nærmere.', 'Street', 'Nybegynner', 'Motiv'],
      ['Skygger som form', 'Finn en sterk skygge i gaten og gjør den til en del av bildet — ikke bare bakgrunn, men selve motivet.', 'Street', 'Nybegynner', 'Lys'],
      // Street — Litt øvelse
      ['Vent på øyeblikket', 'Finn ett sted og vent. Ta bildet i det eksakte øyeblikket noe skjer — ikke sekundet før eller etter.', 'Street', 'Litt øvelse', 'Timing'],
      ['Byens geometri', 'Finn symmetri, mønstre eller geometri i bygninger, gater eller refleksjoner og gjør det til hovedstrukturen.', 'Street', 'Litt øvelse', 'Komposisjon'],
      // Street — Klar for mer
      ['Kontrast mellom to verdener', 'Ta et bilde der to ting som er helt forskjellige møtes i ett bilde — gammelt og nytt, stille og kaos, lys og mørke.', 'Street', 'Klar for mer', 'Motiv'],
      ['Hardt lys i byen', 'Bruk det harde middagslyset til å skape dramatiske skygger og skarpe kontraster i bybildet.', 'Street', 'Klar for mer', 'Lys'],
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

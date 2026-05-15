-- Reference schema for Sightline MVP.
-- The running app creates/migrates tables from models/db.js on startup.

CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT,
  experience_level TEXT,
  preferred_style TEXT,
  goal TEXT,
  camera TEXT,
  biggest_challenge TEXT,
  total_critiques INTEGER DEFAULT 0,
  last_active DATETIME,
  onboarding_version INTEGER DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE challenges (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT,
  difficulty TEXT,
  focus_area TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE photos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  challenge_id INTEGER,
  image_path TEXT NOT NULL,
  original_name TEXT,
  caption TEXT,
  manual_iso TEXT,
  manual_shutter TEXT,
  manual_flash TEXT,
  time_of_day TEXT,
  uploaded_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY(user_id) REFERENCES users(id),
  FOREIGN KEY(challenge_id) REFERENCES challenges(id)
);

CREATE TABLE critiques (
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
  model_used TEXT,
  prompt_version INTEGER DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY(photo_id) REFERENCES photos(id)
);

CREATE TABLE generated_challenges (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  focus_area TEXT,
  difficulty TEXT,
  why_this_challenge TEXT,
  generated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY(user_id) REFERENCES users(id)
);

CREATE TABLE app_config (
  key TEXT PRIMARY KEY,
  value TEXT
);

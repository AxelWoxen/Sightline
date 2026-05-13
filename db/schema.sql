CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT,
  experience_level TEXT,
  preferred_style TEXT,
  goal TEXT,
  camera TEXT,
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
  next_task TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY(photo_id) REFERENCES photos(id)
);

DELETE FROM challenges;

INSERT INTO challenges (title, description, category, difficulty) VALUES
('Foreground depth', 'Include something in the foreground to create depth in a landscape photo.', 'Landscape photography', 'Easy'),
('Golden hour layers', 'Take a landscape photo during soft light and try to separate foreground, middle ground and background.', 'Landscape photography', 'Medium'),
('Natural leading lines', 'Use a road, river, path or mountain ridge to guide the viewer through the image.', 'Landscape photography', 'Easy'),

('Urban symmetry', 'Find symmetry in buildings, streets or reflections and use it as the main structure of the photo.', 'Street photography', 'Easy'),
('Shadow story', 'Find a strong shadow in the city and make it part of the story.', 'Street photography', 'Easy'),
('One clear subject', 'Capture one clear subject in a busy street scene. Remove distractions by changing your angle.', 'Street photography', 'Medium'),

('Window light', 'Take a portrait using soft natural light from a window.', 'Portrait photography', 'Easy'),
('Subject separation', 'Create separation between the person and the background using light, distance or contrast.', 'Portrait photography', 'Medium'),
('Expression over pose', 'Take a portrait where the expression feels natural, not overly posed.', 'Portrait photography', 'Easy');


const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, 'sightline.sqlite');
const uploadsPath = path.join(__dirname, '..', 'public', 'uploads');

if (fs.existsSync(dbPath)) {
  fs.unlinkSync(dbPath);
  console.log('Deleted existing database. It will be recreated from models/db.js on next npm start.');
} else {
  console.log('No database file found. A new one will be created on next npm start.');
}

if (fs.existsSync(uploadsPath)) {
  for (const file of fs.readdirSync(uploadsPath)) {
    if (file !== '.gitkeep') {
      fs.rmSync(path.join(uploadsPath, file), { recursive: true, force: true });
    }
  }

  console.log('Cleared uploaded files from public/uploads.');
}

const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, 'sightline.sqlite');
if (fs.existsSync(dbPath)) {
  fs.unlinkSync(dbPath);
  console.log('Deleted existing database. It will be recreated on next npm start.');
} else {
  console.log('No database file found.');
}

const { run, get, all } = require('./db');

async function createPhoto({ user_id, challenge_id, image_path, original_name, caption }) {
  const result = await run(
    `INSERT INTO photos (user_id, challenge_id, image_path, original_name, caption)
     VALUES (?, ?, ?, ?, ?)`,
    [user_id, challenge_id || null, image_path, original_name, caption || null]
  );

  return get('SELECT * FROM photos WHERE id = ?', [result.id]);
}

async function getPhotoById(id) {
  return get(
    `SELECT photos.*, challenges.title AS challenge_title, challenges.description AS challenge_description
     FROM photos
     LEFT JOIN challenges ON photos.challenge_id = challenges.id
     WHERE photos.id = ?`,
    [id]
  );
}

async function getPhotosByUser(userId) {
  return all(
    `SELECT photos.*, 
            challenges.title AS challenge_title,
            challenges.category AS challenge_category,
            critiques.composition_score, 
            critiques.lighting_score,
            critiques.storytelling_score, 
            critiques.technical_score,
            critiques.feedback_text, 
            critiques.next_task
     FROM photos
     LEFT JOIN challenges ON photos.challenge_id = challenges.id
     LEFT JOIN critiques ON critiques.photo_id = photos.id
     WHERE photos.user_id = ?
     ORDER BY photos.uploaded_at DESC`,
    [userId]
  );
}

async function deletePhotoById(photoId) {
  return run('DELETE FROM photos WHERE id = ?', [photoId]);
}

async function deleteOldestPhotoForUser(userId) {
  const oldestPhoto = await get(
    `SELECT *
     FROM photos
     WHERE user_id = ?
     ORDER BY uploaded_at ASC, id ASC
     LIMIT 1`,
    [userId]
  );

  if (!oldestPhoto) return null;

  await run('DELETE FROM critiques WHERE photo_id = ?', [oldestPhoto.id]);
  await run('DELETE FROM photos WHERE id = ?', [oldestPhoto.id]);

  return oldestPhoto;
}

module.exports = {
  createPhoto,
  getPhotoById,
  getPhotosByUser,
  deleteOldestPhotoForUser,
  deletePhotoById
};
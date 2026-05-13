const { run, get } = require('./db');

async function createCritique({ photo_id, composition_score, lighting_score, storytelling_score, technical_score, feedback_text, next_task }) {
  const result = await run(
    `INSERT INTO critiques (photo_id, composition_score, lighting_score, storytelling_score, technical_score, feedback_text, next_task)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [photo_id, composition_score, lighting_score, storytelling_score, technical_score, feedback_text, next_task]
  );
  return get('SELECT * FROM critiques WHERE id = ?', [result.id]);
}

async function getCritiqueByPhotoId(photoId) {
  return get('SELECT * FROM critiques WHERE photo_id = ?', [photoId]);
}

async function deleteCritiqueByPhotoId(photoId) {
  return run('DELETE FROM critiques WHERE photo_id = ?', [photoId]);
}

module.exports = { createCritique, getCritiqueByPhotoId, deleteCritiqueByPhotoId };

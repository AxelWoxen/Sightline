const { run, get } = require('./db');

async function createCritique({ photo_id, composition_score, lighting_score, storytelling_score, technical_score, feedback_text, feedback_what_works, feedback_technical, feedback_camera, feedback_next_time, next_task }) {
  const result = await run(
    `INSERT INTO critiques (photo_id, composition_score, lighting_score, storytelling_score, technical_score, feedback_text, feedback_what_works, feedback_technical, feedback_camera, feedback_next_time, next_task)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [photo_id, composition_score, lighting_score, storytelling_score, technical_score, feedback_text, feedback_what_works || null, feedback_technical || null, feedback_camera || null, feedback_next_time || null, next_task]
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

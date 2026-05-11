const photoModel = require('../models/photoModel');
const critiqueModel = require('../models/critiqueModel');

exports.showCritique = async (req, res) => {
  const photo = await photoModel.getPhotoById(req.params.photoId);
  if (!photo) return res.status(404).render('404', { title: 'Photo not found' });

  const critique = await critiqueModel.getCritiqueByPhotoId(photo.id);
  res.render('critique', { title: 'AI critique', photo, critique });
};

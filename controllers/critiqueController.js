const photoModel = require('../models/photoModel');
const critiqueModel = require('../models/critiqueModel');

exports.showCritique = async (req, res) => {
  try {
    const photo = await photoModel.getPhotoById(req.params.photoId);

    if (!photo || photo.user_id !== req.session.user.id) {
      return res.status(404).render('404', {
        title: 'Photo not found'
      });
    }

    const critique = await critiqueModel.getCritiqueByPhotoId(photo.id);

    res.render('critique', {
      title: 'AI critique',
      photo,
      critique
    });
  } catch (error) {
    console.error(error);
    res.status(500).render('error', {
      title: 'Critique error',
      message: 'Could not load critique.'
    });
  }
};
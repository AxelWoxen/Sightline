const express = require('express');
const router = express.Router();

const { requireUser } = require('../middleware/authMiddleware');
const photoController = require('../controllers/photoController');

router.get('/upload', requireUser, photoController.showUploadPage);

router.post(
  '/upload',
  requireUser,
  (req, res, next) => {
    photoController.upload.single('photo')(req, res, (err) => {
      if (err) {
        return res.status(400).render('error', {
          title: 'Upload failed',
          message: err.message
        });
      }

      next();
    });
  },
  photoController.handleUpload
);

router.post('/delete/:photoId', requireUser, photoController.deletePhoto);

module.exports = router;
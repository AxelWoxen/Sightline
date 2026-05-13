const fs = require('fs');
const path = require('path');
const multer = require('multer');

const photoModel = require('../models/photoModel');
const challengeModel = require('../models/challengeModel');
const critiqueModel = require('../models/critiqueModel');
const { generateMockCritique } = require('../services/critiqueService');

const storage = multer.diskStorage({
  destination: (req, file, cb) =>
    cb(null, path.join(__dirname, '..', 'public', 'uploads')),

  filename: (req, file, cb) => {
    const safeName = file.originalname.replace(/[^a-zA-Z0-9.\-_]/g, '_');
    cb(null, `${Date.now()}-${safeName}`);
  },
});

exports.upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024
  },
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith('image/')) {
      return cb(new Error('Only image files are allowed'));
    }

    cb(null, true);
  }
});

exports.showUploadPage = async (req, res) => {
  let challenges = await challengeModel.getChallengesByStyle(
    req.session.user.preferred_style
  );
  
  if (!challenges || challenges.length === 0) {
    challenges = await challengeModel.getAllChallenges();
  }

  const selectedChallengeId = req.query.challenge || null;

  res.render('upload', {
    title: 'Upload photo',
    challenges,
    selectedChallengeId,
    error: null
  });
};

exports.handleUpload = async (req, res) => {
  try {
    if (!req.file) {
      const challenges = await challengeModel.getChallengesByStyle(
        req.session.user.preferred_style
      );
    
      return res.status(400).render('upload', {
        title: 'Upload photo',
        challenges,
        selectedChallengeId: req.body.challenge_id || null,
        error: 'Please choose a photo before uploading.'  
      });
    }

    const photo = await photoModel.createPhoto({
      user_id: req.session.user.id,
      challenge_id: req.body.challenge_id || null,
      image_path: `/uploads/${req.file.filename}`,
      original_name: req.file.originalname,
      caption: req.body.caption || null,
    });

    const critique = generateMockCritique({
      user: req.session.user,
      caption: req.body.caption || null,
    });

    await critiqueModel.createCritique({
      photo_id: photo.id,
      ...critique
    });

    const photos = await photoModel.getPhotosByUser(req.session.user.id);

    if (photos.length > 5) {
      const deletedPhoto = await photoModel.deleteOldestPhotoForUser(
        req.session.user.id
      );

      if (deletedPhoto && deletedPhoto.image_path) {
        const filePath = path.join(
          __dirname,
          '..',
          'public',
          deletedPhoto.image_path
        );

        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      }
    }

    res.redirect(`/critique/${photo.id}`);
  } catch (error) {
    console.error(error);
    res.status(500).render('error', {
      title: 'Upload error',
      message: 'Could not upload photo.'
    });
  }
};

exports.deletePhoto = async (req, res) => {
  try {
    const photo = await photoModel.getPhotoById(req.params.photoId);

    if (!photo || photo.user_id !== req.session.user.id) {
      return res.status(404).render('404', {
        title: 'Photo not found'
      });
    }

    if (photo.image_path) {
      const filePath = path.join(
        __dirname,
        '..',
        'public',
        photo.image_path
      );

      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    await critiqueModel.deleteCritiqueByPhotoId(photo.id);
    await photoModel.deletePhotoById(photo.id);

    res.redirect('/progress');
  } catch (error) {
    console.error(error);

    res.status(500).render('error', {
      title: 'Delete error',
      message: 'Could not delete photo.'
    });
  }
};
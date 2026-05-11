const path = require('path');
const multer = require('multer');
const photoModel = require('../models/photoModel');
const challengeModel = require('../models/challengeModel');
const critiqueModel = require('../models/critiqueModel');
const { generateMockCritique } = require('../services/critiqueService');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, '..', 'public', 'uploads')),
  filename: (req, file, cb) => {
    const safeName = file.originalname.replace(/[^a-zA-Z0-9.\-_]/g, '_');
    cb(null, `${Date.now()}-${safeName}`);
  },
});

exports.upload = multer({ storage });

exports.showUploadPage = async (req, res) => {
  const challenges = await challengeModel.getAllChallenges();
  res.render('upload', { title: 'Upload photo', challenges });
};

exports.handleUpload = async (req, res) => {
  try {
    if (!req.file) return res.redirect('/photos/upload');

    const photo = await photoModel.createPhoto({
      user_id: req.session.user.id,
      challenge_id: req.body.challenge_id,
      image_path: `/uploads/${req.file.filename}`,
      original_name: req.file.originalname,
      caption: req.body.caption,
    });

    const critique = generateMockCritique({
      user: req.session.user,
      caption: req.body.caption,
    });

    await critiqueModel.createCritique({ photo_id: photo.id, ...critique });
    res.redirect(`/critique/${photo.id}`);
  } catch (error) {
    console.error(error);
    res.status(500).render('error', { title: 'Upload error', message: 'Could not upload photo.' });
  }
};

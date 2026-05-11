const express = require('express');
const router = express.Router();
const { requireUser } = require('../middleware/authMiddleware');
const photoController = require('../controllers/photoController');

router.get('/upload', requireUser, photoController.showUploadPage);
router.post('/upload', requireUser, photoController.upload.single('photo'), photoController.handleUpload);

module.exports = router;

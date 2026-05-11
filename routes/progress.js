const express = require('express');
const router = express.Router();
const { requireUser } = require('../middleware/authMiddleware');
const progressController = require('../controllers/progressController');

router.get('/', requireUser, progressController.showProgress);

module.exports = router;

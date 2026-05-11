const express = require('express');
const router = express.Router();
const { requireUser } = require('../middleware/authMiddleware');
const critiqueController = require('../controllers/critiqueController');

router.get('/:photoId', requireUser, critiqueController.showCritique);

module.exports = router;

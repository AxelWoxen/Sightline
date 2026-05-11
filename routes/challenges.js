const express = require('express');
const router = express.Router();
const { requireUser } = require('../middleware/authMiddleware');
const challengeController = require('../controllers/challengeController');

router.get('/', requireUser, challengeController.listChallenges);

module.exports = router;

const express = require('express');
const router = express.Router();
const onboardingController = require('../controllers/onboardingController');

router.get('/', onboardingController.showOnboarding);
router.post('/', onboardingController.createProfile);

module.exports = router;

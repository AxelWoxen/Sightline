const express = require('express');
const router = express.Router();
const { requireUser } = require('../middleware/authMiddleware');
const dashboardController = require('../controllers/dashboardController');

router.get('/', requireUser, dashboardController.showDashboard);

module.exports = router;

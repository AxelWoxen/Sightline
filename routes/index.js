const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexController');

router.get('/', indexController.showLanding);

router.get('/reset', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/onboarding');
  });
});

router.get('/api/status', (req, res) => {
  res.json({ status: 'ok', version: '1.0.0' });
});

module.exports = router;
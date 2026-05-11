const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexController');

router.get('/', indexController.showLanding);

router.get('/reset', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/onboarding');
  });
});

module.exports = router;
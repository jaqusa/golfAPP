const express = require('express');
const router  = express.Router();

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/scorecard', (req, res, next) => {
  res.render('match/scorecard');
});

module.exports = router;

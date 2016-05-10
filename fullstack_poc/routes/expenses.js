var express = require('express');
var router = express.Router();

/* GET Expenses listing. */
router.get('/', function(req, res, next) {
  res.send('Get All Expenses');
});

module.exports = router;

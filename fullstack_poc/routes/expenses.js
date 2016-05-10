var express = require('express');
var router = express.Router();

var expenseDAOClass = require("./../dao/mongo/expenseDAO");
var expenseDAO = new expenseDAOClass();

/* GET Expenses listing. */
router.get('/', function(req, res, next) {
  var title = "First Title",
    amount = 100,
    date = new Date().now;
  expenseDAO.addExpense(title, amount, date, function (err, expense) {
    if (err){ 
      console.error(err);
      res.send(err);
    }
    else{
      res.send(expense);
    }
  });
});

module.exports = router;

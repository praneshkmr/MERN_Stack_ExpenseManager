var express = require('express');
var router = express.Router();

var expenseDAOClass = require("./../dao/mongo/expenseDAO");
var expenseDAO = new expenseDAOClass();

/* GET Expenses listing. */
router.get('/', function(req, res, next) {
  expenseDAO.getAllExpense("",function (err, expenses) {
    if (err){ 
      console.error(err);
      res.send(err);
    }
    else{
      res.send(expenses);
    }
  });
});

router.get('/:id', function(req, res, next) {
  if(req.params.id) {
    var expenseId = req.params.id;
    expenseDAO.getExpense(expenseId,"",function (err, expenses) {
      if (err){ 
        console.error(err);
        res.send(err);
      }
      else{
        res.send(expenses[0]);
      }
    });
  }
  else{
    res.status(400).send('Expense ID is required');
  }
});

router.post('/', function (req, res, next) {
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
    };
  });
});

module.exports = router;

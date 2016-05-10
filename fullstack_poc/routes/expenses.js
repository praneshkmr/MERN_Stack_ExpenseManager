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
  if(req.body.title && req.body.amount && req.body.date && req.body.user) {
    var title = req.body.title,
      amount = req.body.amount,
      date = req.body.date,
      user = req.body.user;
    expenseDAO.addExpense(title, amount, date, user, function (err, expense) {
      if (err){ 
        console.error(err);
        res.send(err);
      }
      else{
        res.send(expense);
      };
    });
    }
  else{
    res.status(400).send('Title, Amount and Date is required');
  }
});

router.delete('/:id', function(req, res, next) {
  if(req.params.id) {
    var expenseId = req.params.id;
    expenseDAO.deleteExpense(expenseId,"",function (err, expenses) {
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

module.exports = router;

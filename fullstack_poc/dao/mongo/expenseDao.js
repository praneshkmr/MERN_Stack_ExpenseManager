var mongoose = require('mongoose');
var ExpenseModel = mongoose.model('ExpenseModel');

var expenseDAO = function () {
    
};

expenseDAO.prototype.addExpense = function(title, amount, date, callback){
  var expense = new ExpenseModel({
    title : "First Title",
    amount : 100,
    date : new Date().now
  });
  expense.save(callback);
};

expenseDAO.prototype.getAllExpense = function(user, callback){
  ExpenseModel.find({}, callback);
};

expenseDAO.prototype.getExpense = function(_id, user, callback){
  ExpenseModel.find({ "_id" : _id }, callback);
};

module.exports = expenseDAO;
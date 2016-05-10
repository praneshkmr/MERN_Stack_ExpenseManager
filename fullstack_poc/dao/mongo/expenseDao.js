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
  ExpenseModel.find({ "isDeleted" : false }, callback);
};

expenseDAO.prototype.getExpense = function(_id, user, callback){
  ExpenseModel.find({ "_id" : _id,  "isDeleted" : false }, callback);
};

expenseDAO.prototype.deleteExpense = function(_id, user, callback){
  ExpenseModel.findOneAndUpdate({ "_id" : _id,  "isDeleted" : false }, {"isDeleted" : true }, callback);
};

module.exports = expenseDAO;
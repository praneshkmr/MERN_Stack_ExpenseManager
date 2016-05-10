var mongoose = require('mongoose');
var ExpenseModel = mongoose.model('ExpenseModel');

var expenseDAO = function () {
    
};

expenseDAO.prototype.addExpense = function(title, amount, date, user, callback){
  var expense = new ExpenseModel({
    title : title,
    amount : amount,
    date : date,
    user : user
  });
  expense.save(callback);
};

expenseDAO.prototype.getAllExpense = function(user, callback){
  ExpenseModel.find({ "isDeleted" : false }, callback);
};

expenseDAO.prototype.getExpense = function(_id, user, callback){
  ExpenseModel.find({ "_id" : _id,  "isDeleted" : false }, callback);
};

expenseDAO.prototype.updateExpense = function(_id, user, data, callback){
  ExpenseModel.findOneAndUpdate({ "_id" : _id,  "isDeleted" : false }, data, callback);
};

expenseDAO.prototype.deleteExpense = function(_id, user, callback){
  ExpenseModel.findOneAndUpdate({ "_id" : _id,  "isDeleted" : false }, {"isDeleted" : true }, callback);
};

module.exports = expenseDAO;
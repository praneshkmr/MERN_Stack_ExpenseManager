var mongoose = require('mongoose');
var UserModel = mongoose.model('UserModel');

var userDAO = function () {
    
};

userDAO.prototype.addUser = function(name, email, password, callback){
  var user = new UserModel({
    name: name,
    email: email,
    password: password
  });
  user.save(callback);
};

userDAO.prototype.getAllUsers = function(callback){
  UserModel.find({}, callback);
};

userDAO.prototype.getUser = function(_id, callback){
  UserModel.find({ "_id" : _id }, callback);
};

module.exports = userDAO;
var express = require('express');
var router = express.Router();

var userDAOClass = require("./../dao/mongo/userDAO");
var userDAO = new userDAOClass();

/* GET users listing. */
router.get('/', function(req, res, next) {
  userDAO.getAllUsers(function (err, users) {
    if (err){ 
      console.error(err);
      res.status(500).send(err);
    }
    else{
      res.send(users);
    }
  });
});

router.get('/:id', function(req, res, next) {
  if(req.params.id) {
    var userId = req.params.id;
    userDAO.getUser(userId,function (err, users) {
      if (err){ 
        console.error(err);
        res.status(500).send(err);
      }
      else{
        res.send(users[0]);
      }
    });
  }
  else{
    res.status(400).send('User ID is required');
  }
});

router.post('/', function (req, res, next) {
   var name = "Pranesh",
    email = "praneshkmr@gmail.com",
    password = "temp123"
  userDAO.addUser(name, email, password, function (err, user) {
    if (err){ 
        console.error(err);
        res.status(500).send(err);
      }
      else{
        res.send(user);
      }
  });
});

module.exports = router;

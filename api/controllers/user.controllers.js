var mongoose = require('mongoose');
var User = mongoose.model('user');

module.exports.userGetOne = (req, res) => {
  var id = req.params.userId;

  console.log('Get userId', id);

  User
    .findById(id)
    .exec(function(err, user){
      if (err){
        console.log("Error finding user");
        res
            .status(500)
            .json(err);
      } else if (!user) {
        console.log("UserId not found in database", id);
        res
            .status(400)
            .json(err);
      }
        res
            .status(200)
            .json(user);
    });
};

module.exports.userAddOne = (req, res) => {
  console.log("Add new user");

  User
    .create({
      userFirstName : req.body.userFirstName,
      userLastName : req.body.userLastName,
      userPassword : req.body.userPassword,
      userEmail : req.body.userEmail,
    }, function(err, user){
      if (err) {
        console.log("Error creating user");
        res
            .status(400)
            .json(err);
      } else {
        console.log("User created", user);
        res
            .status(200)
            .json(user)
      }
    });
};

module.exports.deleteUser = (req, res) => {
  var userId = req.params.userId;

  User
    .findByIdAndRemove(userId)
    .exec(function(err, user){
      if(err){
        res
            .status(500)
            .json(err);
      } else {
        console.log("User deleted, id: ", userId);
        res
            .status(201)
            .json({"msg" : "user deleted"});
      }
    });
};

module.exports.putUser = (req, res) => {
  var userId = req.params.userId;

  User
    .findById(userId)
    .exec(function(err, user){
      if (err){
        console.log("Error finding user");
        res
          .status(500)
          .json(err);
        return;
      } else if (!user){
        console.log("UserId not found in database", userId);
        res
          .status(404)
          .json(err);
        return
      }
      console.log(Date.now());

      user.userFirstName = req.body.userFirstName,
      user.userLastName = req.body.userLastName,
      user.userPassword = req.body.userPassword,
      user.userEmail = req.body.userEmail,

    user
      .save(function(err, userUpdated){
        if (err){
          res
            .status(500)
            .json(err);
        } else {
          res
            .status(200)
            .json(user);
        }
      });
    });
};

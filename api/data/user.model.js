var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  userFirstName : {
    type : String,
    required : true
  },
  userLastName : {
    type : String,
    required : true
  },
  userPassword : {
    type : String,
    required : true
  },
  userEmail : {
    type : String,
    required : true
  }
});

mongoose.model("user", userSchema);

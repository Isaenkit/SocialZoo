var mongoose = require('mongoose');

var zooSchema = new mongoose.Schema({
  name : {
    type : String,
    required : true
  },
  address : {
    type : String,
    required : true
  },
  description : String,
  population : Number,
  superficy : String,
  species : [String],
  photos : [String],
  hours : String,
  price : Number,
  currency : String,
  login : String,
  password : String
});

mongoose.model("zoo", zooSchema, "zoo");

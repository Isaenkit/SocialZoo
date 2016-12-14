var mongoose = require('mongoose');

var reviewSchema = new mongoose.Schema({
  idcreator : {
    type : String,
    required : true
  },
  idmessage : {
    type : String,
    required : true
  },
  content : {
    type : String,
    required : true
  },
  commentedOn : {
    type : Date,
    "default" : Date.now
  }
});

var messageSchema = new mongoose.Schema({
  username : {
    type : String,
    required : true
  },
  content : {
    type : String,
    required : true
  },
  createdOn : {
    type : Date,
    "default" : Date.now
  },
  review : [reviewSchema]
});


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
  password : String,
  messages : [messageSchema]
});

mongoose.model("zoo", zooSchema, "zoo");

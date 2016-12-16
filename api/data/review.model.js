var mongoose = require('mongoose');

var reviewSchema = new mongoose.Schema({
  zooId : {
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

mongoose.model("review", reviewSchema);

var mongoose = require('mongoose');
var Message = mongoose.model('Message');

module.exports.messageGetAll = function(req, res){
  var id = req.params.zooId;
  console.log('GET message for zooId', id);

  Message
  .findById(id)
  .select('messages')
  .exec(function(err, msg){
    if (err){
      res.status(500).json(err);
    }
    else if (!msg){
      console.log('Messages id not found in database', id);
      res.status(404).json({"Error": "Id not found"});
    } else {
      res.json(msg.messages);
    }
  });
};
module.exports.messageAddOne = function(req, res){
  var id = req.params.zooId;

  console.log('POST message to zooId', Id);

  Message
  .create({
    username : req.body.username,
    content : req.body.content
  }, function(err, message){
    if (err) {
      console.log("Error creating message");
      res
        .status(201)
        .json(message);
    }
  });
};

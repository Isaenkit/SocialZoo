var mongoose = require('mongoose');
var Message = mongoose.model('Message');

module.exports.messageGetOne = (req, res) => {
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
module.exports.messageAddOne = (req, res) => {
  var id = req.params.zooId;

  console.log('POST message to zooId', Id);

  Message
  .findById(id)
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

var mongoose = require('mongoose');
var Message = mongoose.model('Message');

module.exports.messageGetOne = (req, res) => {
    var id = req.params.messageId;

    console.log('GET message for messageId', id);

    Message
        .findById(id)
        .exec(function(err, msg) {
            if (err) {
                console.log("Error finding message");
                res
                    .status(500)
                    .json(err);
            } else if (!msg) {
                console.log('MessageId not found in database', id);
                res
                    .status(404)
                    .json({
                        "Error": "Id not found"
                    });
            }
            res
                .status(200)
                .json(msg);
        });
};

module.exports.messageGetAllByZooId = (req, res) => {
    var id = req.params.zooId;

    console.log('GET message for zooId', id);

    Message
        .find({
            "zooId": id
        })
        .exec(function(err, msg) {
            if (err) {
                console.log("Error finding message");
                res
                    .status(500)
                    .json(err);
            } else if (!msg) {
                console.log('MessageId not found in database', id);
                res
                    .status(404)
                    .json({
                        "Error": "Id not found"
                    });
            }
            res
                .status(200)
                .json(msg);
        });
};

module.exports.messageAddOne = (req, res) => {
    var id = req.params.zooId;

    console.log('POST message to zooId', id);

    Message
        .create({
            zooId: id,
            username: req.body.username,
            content: req.body.content
        }, function(err, message) {
            if (err) {
                console.log("Error creating message");
                res
                    .status(400)
                    .json(err);
            } else {
                console.log("Message created", message);
                res
                    .status(201)
                    .json(message)
            }
        });
};

module.exports.putMessage = (req, res) => {
    var id = req.params.messageId;

    Message
        .findById(messageId)
        .exec(function(err, message) {
            if (err) {
                console.log("Error finding message");
                res
                    .status(500)
                    .json(err);
                return;
            } else if (!message) {
                console.log("MessageId not found in database", messageId);
                res
                    .status(404)
                    .json(err);
                return
            }
            console.log(Date.now());

            message.username = req.body.username,
                message.content = req.body.content,

                message
                .save(function(err, messageUpdated) {
                    if (err) {
                        res
                            .status(500)
                            .json(err);
                    } else {
                        res
                            .status(200)
                            .json(message);
                    }
                });
        });
};

module.exports.deleteMessage = (req, res) => {
    var messageId = req.params.messageId;

    Message
        .findByIdAndRemove(messageId)
        .exec(function(err, user) {
            if (err) {
                res
                    .status(500)
                    .json(err);
            } else {
                console.log("Message deleted, id: ", messageId);
                res
                    .status(201)
                    .json({
                        "msg": "message deleted"
                    });
            }
        });
};

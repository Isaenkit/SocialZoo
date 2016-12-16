var mongoose = require('mongoose');

var messageSchema = new mongoose.Schema({
    zooId: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    createdOn: {
        type: Date,
        "default": Date.now
    }
});

mongoose.model("Message", messageSchema);

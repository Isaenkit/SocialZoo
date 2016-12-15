var express = require('express');
var router = express.Router();

var ctrlMessage = require('../controllers/message.controllers.js')
var ctrlZoo = require('../controllers/zoo.controllers.js');
//Message routes
router
.post(ctrlMessage.messageAddOne);

router
.route('/messages/:messageId')
.get(ctrlMessage.messageGetOne);

// zoo routes
router
.route('/zoo')
.get(ctrlZoo.zooGetAll)
.post(ctrlZoo.zooAddOne);

router
.route('/zoo/:zooId')
.get(ctrlZoo.zooGetOne)
.delete(ctrlZoo.deleteZoo)
.put(ctrlZoo.putZoo);

module.exports = router;

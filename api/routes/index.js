var express = require('express');
var router = express.Router();

// // var ctrlMessage = require('../controllers/message.controllers.js')
var ctrlZoo = require('../controllers/zoo.controllers.js');
// // // Message routes
// // router
// // .route('/messages')
// // .post(ctrlMessage.messageAddOne);
// //
// // router
// // .route('/messages/:messageId')
// // .get(ctrlMessage.messageGetAll);
//
router.route('/zoo').get(ctrlZoo.zooGetAll);

module.exports = router;

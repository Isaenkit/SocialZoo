var express = require('express');
var router = express.Router();

var ctrlMessage = require('../controllers/message.controllers.js')
var ctrlZoo = require('../controllers/zoo.controllers.js');
var ctrlUser = require('../controllers/user.controllers.js');
var ctrlReview = require('../controllers/review.controllers.js');
//Message routes
router
    .route('/message/:zooId')
    .post(ctrlMessage.messageAddOne)
    .get(ctrlMessage.messageGetAllByZooId);

router
    .route('/message/:messageId/comment')
    .post(ctrlReview.reviewAddOne)
    .get(ctrlReview.reviewGetAll);

router
    .route('/message/:messageId')
    .get(ctrlMessage.messageGetOne)
    .delete(ctrlMessage.deleteMessage)
    .put(ctrlMessage.putMessage);

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

// user routes

router
    .route('/user')
    .post(ctrlUser.userAddOne);

router
    .route('/user/:userId')
    .get(ctrlUser.userGetOne)
    .put(ctrlUser.putUser)
    .delete(ctrlUser.deleteUser);

module.exports = router;

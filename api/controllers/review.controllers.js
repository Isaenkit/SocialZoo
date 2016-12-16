var mongoose = require('mongoose');
var Review = mongoose.model('review');

module.exports.reviewGetOne = (req, res) => {
  var id = req.params.messageId;

  Review
    .findById(messageId)
    .exec(function(err, review){
      if (err){
        console.log("Error finding review");
        res
          .status(500)
          .json(err);
      } else if (!review){
        console.log("MessageId not found in database", id);
        res
          .status(404)
          .json(err);
      }
        res
          .status(200)
          .json(review);
    });
};

module.exports.reviewGetAll = (req, res) => {
  var id = req.params.messageId;

  Review
    .find({"idmessage" : id})
    .exec(function(err, review){
      if (err){
        console.log("Error finding review");
        res
          .status(500)
          .json(err);
      } else if (!review){
        console.log("MessageId not found in database", id);
        res
          .status(404)
          .json(err);
      }
        res
          .status(200)
          .json(review);
    });
};

module.exports.reviewAddOne = (req, res) => {
  console.log("Add new review");

  Review
    .create({
      zooId : req.body.zooId,
      idmessage : req.body.idmessage,
      content : req.body.content,

    }, function(err, review){
      if (err) {
        console.log(err);
        res
            .status(400)
            .json(err);
      } else {
        console.log("Review created", review);
        res
            .status(200)
            .json(review)
      }
    });
};

module.exports.deleteReview = (req, res) => {
  var reviewId = req.params.reviewId;

  Review
    .findByIdAndRemove(reviewId)
    .exec(function(err, review){
      if(err){
        res
            .status(500)
            .json(err);
      } else {
        console.log("Review deleted, id :", reviewId);
        res
            .status(201)
            .json({"msg" : "review deleted"});
      }
    });
};

module.exports.putReview = (req, res) => {
  var reviewId = req.params.reviewId;

  Review
    .findById(reviewId)
    .exec(function(err, review){
      if (err){
        console.log("Error finding review");
        res
            .status(500)
            .json(err);
        return;
      } else if(!review){
        console.log("ReviewId not found in database", reviewId);
        res
            .status(404)
            .json(err);
        return
      }
      console.log(Date.now());

      review.idmessage = req.body.idmessage,
      review.content = req.body.content,

    review
      .save(function(err, reviewUpdated){
        if(err){
          res
            .status(500)
            .json(user);
        }
      });
    });
}

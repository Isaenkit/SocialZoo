var mongoose = require('mongoose');
var Zoo = mongoose.model('zoo');

module.exports.zooGetAll = function(req, res){
  console.log('GET the zoo');
  console.log(req);

  Zoo
    .find()
    .exec(function(err, zoos){
      console.log(err);
      console.log(zoos);
      if (err){
        console.log("Error finding zoo");
        res
          .status(500)
          .json(err);
      } else {
        console.log("Found zoos", zoos.length);
        res
          .json(zoos);
      }
    });
};

module.exports.zooGetOne = function(req, res) {
  var id = req.param.zooId;
  console.log('Get zooId', id);

  Zoo
    .findById(id)
    .exec(function(err, doc){
      var response = {
        status : 200,
        message : doc
      };
      if (err){
        console.log("Error finding zoo");
        response.status = 500;
        response.message = err;
      } else if(!doc){
        console.log("ZooId not found in database", id);
        reponse.status = 400;
        response.message = {
          "message" : "Zoo ID not found " + id
        };
      }
      res
        .status(response.status)
        .json(response.message);
    });
};
var _splitArray = function(input) {
  var output;
  if (input && input.length > 0) {
    output = input.split(";");
  } else {
    output = [];
  }
  return output;
};

module.exports.zooAddOne = function(req, res) {
  console.log("Post new zoo");

  Zoo
  .create({
    name : req.body.name,
    address : req.body.addres,
    description : req.body.description,
    population : req.body.population,
    superficy : req.body.superficy,
    species : _splitArray(req.body.species),
    photos : _splitArray(req.body.photos),
    hours : req.body.hours,
    price : req.body.price,
    currency : req.body.currency,
    login : req.body.login,
    password : req.body.password,
    messages : []
  }, function(err , zoo){
    if (err) {
      console.log("Error creating zoo");
      res
        .status(400)
        .json(err);
    } else {
      console.log("Zoo created", zoo);
      res
        .status(200)
        .json(zoo)
    }
  });
}

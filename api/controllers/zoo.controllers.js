var mongoose = require('mongoose');
var Zoo = mongoose.model('zoo');

module.exports.zooGetAll = (req, res) => {
    console.log('GET the zoo');
    console.log(req);

    Zoo
        .find()
        .exec(function(err, zoos) {
            console.log(err);
            console.log(zoos);
            if (err) {
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

module.exports.zooGetOne = (req, res) => {
    var id = req.params.zooId;

    console.log('Get zooId', id);

    Zoo
        .findById(id)
        .exec(function(err, zoo) {
            if (err) {
                console.log("Error finding zoo");
                res
                    .status(500)
                    .json(err);
            } else if (!zoo) {
                console.log("ZooId not found in database", id);
                res
                    .status(400)
                    .json(err);
            }
            res
                .status(200)
                .json(zoo);
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

module.exports.zooAddOne = (req, res) => {
    console.log("Post new zoo");

    Zoo
        .create({
            name: req.body.name,
            address: req.body.address,
            description: req.body.description,
            population: req.body.population,
            superficy: req.body.superficy,
            species: _splitArray(req.body.species),
            photos: _splitArray(req.body.photos),
            hours: req.body.hours,
            price: req.body.price,
            currency: req.body.currency,
            login: req.body.login,
            password: req.body.password,
        }, function(err, zoo) {
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
};

module.exports.deleteZoo = (req, res) => {
    var zooId = req.params.zooId;

    Zoo
        .findByIdAndRemove(zooId)
        .exec(function(err, zoo) {
            if (err) {
                res
                    .status(500)
                    .json(err);
            } else {
                console.log("Zoo deleted, id: ", zooId);
                res
                    .status(201)
                    .json({
                        "msg": "zoo deleted"
                    });
            }
        });
};

module.exports.putZoo = (req, res) => {
    var zooId = req.params.zooId;

    Zoo
        .findById(zooId)
        .exec(function(err, zoo) {
            if (err) {
                console.log("Error finding zoo");
                res
                    .status(500)
                    .json(err);
                return;
            } else if (!zoo) {
                console.log("ZooId not found in database", zooId);
                res
                    .status(404)
                    .json(err);
                return;
            }
            console.log(Date.now());

            zoo.name = req.body.name,
                zoo.address = req.body.address,
                zoo.description = req.body.description,
                zoo.population = req.body.population,
                zoo.superficy = req.body.superficy,
                zoo.species = _splitArray(req.body.species),
                zoo.photos = _splitArray(req.body.photos),
                zoo.hours = req.body.hours,
                zoo.price = req.body.price,
                zoo.currency = req.body.currency,
                zoo.login = req.body.login,
                zoo.password = req.body.password,

                zoo
                .save(function(err, zooUpdated) {
                    if (err) {
                        res
                            .status(500)
                            .json(err);
                    } else {
                        res
                            .status(200)
                            .json();
                    }
                });
        });
};

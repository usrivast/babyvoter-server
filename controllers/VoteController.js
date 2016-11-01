var restful = require('node-restful');
var mongoose    = require('mongoose');

module.exports = function(app, route) {
    var Vote = mongoose.model('Vote', app.models.vote);

    app.get('/api/vote', function (req, res) {

        Vote.find({})
            .populate('user','-password')
            .populate('user','-token')
            .populate('babyName')
            .exec(function(err, vote) {
                if (err) {
                    res.json({
                        type: false,
                        data: "Error occured: " + err
                    });
                } else {
                    res.json(vote);
                }
            });
    });

    app.post('/api/vote/', function (req, res) {
        var BabyName = mongoose.model('BabyName', app.models.babyName);
        var Vote = mongoose.model('Vote', app.models.vote);

        var vote = new Vote();
        vote.month = req.body.month;
        vote.day = req.body.day;
        vote.comment = req.body.comment;
        vote.user = req.body.user;
        vote.gender = req.body.gender;

        vote.save(function (error, vote) {
            if (error) {
                res.json({
                    result: false,
                    data: "Error occured: " + err
                });
            } else {
                var nameArr = req.body.babyName;
                var babyNames = [];
                nameArr.forEach(function (name) {
                    var babyName = new BabyName();
                    babyName.name = name.name;
                    babyName.gender = name.gender;
                    babyName.user = vote.user;
                    babyName.vote = vote._id;
                    babyNames.push(babyName);

                });

                BabyName.create(babyNames, function (error, babyNames) {
                    if (error) {
                        res.json({
                            type: false,
                            data: "Error occured: " + err
                        });
                    } else {
                        babyNames.forEach(function (babyName) {
                            vote.babyName.push(babyName._id);
                        })
                        vote.save(function (error, vote) {
                            if (error) {
                                res.json({
                                    type: false,
                                    data: "Error occured: " + err
                                });
                            } else {
                                res.json({
                                    result: true,
                                    data: vote
                                });
                            }
                        })
                    }
                });

            }
        })
        
        });

    app.get('/api/vote/:id', function (req, res) {
        // var Vote = mongoose.model('Vote', app.models.vote.VoteSchema);

        Vote.findOne({"_id" : req.params.id})
            .populate('user','-password')
            .populate('user','-token')
            .populate('babyName')
            .exec(function(err, vote) {
                if (err) {
                    res.json({
                        type: false,
                        data: "Error occured: " + err
                    });
                } else {
                    res.json(vote);
                }
            });
    });

    app.get('/api/name', function (req, res) {
        // var Vote = mongoose.model('Vote', app.models.vote.VoteSchema);

        Vote.find({})
            .populate('user','-password')
            .populate('user','-token')
            .exec(function(err, vote) {
                if (err) {
                    res.json({
                        type: false,
                        data: "Error occured: " + err
                    });
                } else {
                    res.json(vote);
                }
            });
    });

    // Setup the controller for REST.
    var rest = restful.model(
        'vote',
        app.models.vote
    ).methods(['get', 'put', 'post', 'delete']);

    // Register this endpoint with the application.
    rest.register(app, route);

    // Return middleware.
    return function (req, res, next) {
        next();
    };


};
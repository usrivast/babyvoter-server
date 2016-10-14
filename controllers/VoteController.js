var restful = require('node-restful');
var mongoose    = require('mongoose');

module.exports = function(app, route) {

    app.get('/api/vote', function (req, res) {
        var Vote = mongoose.model('Vote', app.models.vote);

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

    app.get('/api/vote/:id', function (req, res) {
        var Vote = mongoose.model('Vote', app.models.vote);

        Vote.findOne({"_id" : req.params.id})
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
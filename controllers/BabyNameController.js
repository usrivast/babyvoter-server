var restful = require('node-restful');
var mongoose    = require('mongoose');

module.exports = function(app, route) {
    var BabyName = mongoose.model('BabyName', app.models.babyName);

    // Setup the controller for REST.
    var rest = restful.model(
        'babyname',
        app.models.babyName
    ).methods(['get', 'put', 'post', 'delete']);

    // Register this endpoint with the application.
    rest.register(app, route);

    // Return middleware.
    return function (req, res, next) {
        next();
    };


};
var restful = require('node-restful');
var mongoose    = require('mongoose');

module.exports = function(app, route) {
    var User = mongoose.model('User', app.models.user);

    app.post('/api/users/', function (req, res) {
        console.log("Saving the new user info to Mongose ");
        var User = mongoose.model('User', app.models.user);

        var user = new User();
        user.firstName = req.body.firstName;
        user.lastName = req.body.lastName;
        user.username = req.body.username;
        user.password = req.body.password;


        user.save(function (error, user) {
            if (error) {
                res.json({
                    result: false,
                    data: "Error occured: " + err
                });
            } else {
                res.json({
                    result: true,
                    data: user
                });
            }
        });

    });

    // Setup the controller for REST.
    var userrest = restful.model(
        'user',
        app.models.user
    ).methods(['get', 'put', 'post', 'delete']);

    // Register this endpoint with the application.
    userrest.register(app, route);

    // Return middleware.
    return function (req, res, next) {
        next();
    };
};
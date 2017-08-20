var express = require('express'),
    mongodb = require('mongodb').MongoClient,
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;

function authRouterFunc() {

    var router = new express.Router();
    router.route('/signup')
        .post(function (request, response) {
            console.log(request.body);
            var url = 'mongodb://localhost:27017/libraryApp';
            mongodb.connect(url, function (error, db) {
                if (error) {
                    console.log(error);
                    return;
                }

                var collection = db.collection('users'),
                    user = {
                        username: request.body.userName,
                        password: request.body.password
                    };

                collection.insert(user, function (error, results) {
                    if (error) {
                        console.log(error);
                        return;
                    }

                    request.login(results.ops[0], function () {
                        response.redirect('/auth/profile');
                    });
                });
            });
        });

    router.route('/signin')
        .post(passport.authenticate('local', {
            failureRedirect: '/auth/failure'
        }), function (request, response) {
            response.redirect('/auth/profile');
        });

    router.route('/profile')
        .get(function (request, response) {
            console.log(request.user);
            response.json(request.user);
        });

    router.route('/failure')
        .get(function (request, response) {
            response.send('Bad username or password');
        });

    return router;
}

module.exports = authRouterFunc;
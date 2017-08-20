var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    mongodb = require('mongodb').MongoClient;

function strategyFunc() {
    passport.use(new LocalStrategy({
        usernameField: 'userName',
        passwordField: 'password`'
    },
    function (username, password, done) {
        console.log(username);
        var url = 'mongodb://localhost:27017/libraryApp';
        mongodb.connect(url, function (error, db) {
            if (error) {
                console.log(error);
                return;
            }
            var collection = db.collection('users');
            collection.findOne({username: username}, function (error, results) {
                if (error) {
                    console.error(error);
                    return;
                }
                if (results.password === password) {
                    done(null, results);
                }
            });
        });
    }));
}

module.exports = strategyFunc;
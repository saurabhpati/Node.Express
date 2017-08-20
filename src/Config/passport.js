var passport = require('passport');

function passportFunc(app) {
    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser(function (user, done) {
        done(null, user);
    });

    passport.deserializeUser(function (user, done) {
        done(null, user);
    });

    require('./Strategy/local.strategy')();
}

module.exports = passportFunc;
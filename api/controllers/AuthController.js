/**
 * AuthController
 *
 * @description :: Server-side logic for managing auths
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var passport = require('passport');

module.exports = {

    login: function(req, res) {
        console.log('login init');
        console.log(req.allParams());
        passport.authenticate('local', function(err, user, info) {
            if ((err) || (!user)) {
                console.log(info.message);
                return res.send({
                    status: -1,
                    message: info.message,
                    user: user
                });
            }
            req.logIn(user, function(err) {
                if (err) res.send(err);
                console.log(err);
                return res.send({
                    message: info.message,
                    user: user
                });
            });
        })(req, res);
    },

    logout: function(req, res) {
        req.logout();
        res.redirect('/');
    }
};

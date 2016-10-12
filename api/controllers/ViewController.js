module.exports = {
    index: ['isPlayable','isAuthenticated'],

    

    index: function(req, res) {
        res.sendfile(sails.config.appPath + '/assets/main.html');
    }
};

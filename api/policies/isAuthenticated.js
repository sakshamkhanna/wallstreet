module.exports = function(req, res, next) {
    console.log(req.path + 'in Auth');
   if (req.isAuthenticated()) {
        console.log('Authenticated!');
        next();
    }
    else{
        console.log('Not Authenticated!');
        return res.redirect('/player/login');
    }
};
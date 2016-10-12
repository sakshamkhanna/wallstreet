module.exports = {

    index: function(req, res) {
        res.sendfile(sails.config.appPath + '/assets/main.html');
    },



    gitDeploy: function (req, res) {
  if(req.param('pw')=="< yourSecretPassword >") {
     var sys = require('sys')
     var exec = require('child_process').exec;
     function puts(error, stdout, stderr) {
         sys.puts(stdout) 
     }
     exec("git reset --hard HEAD && git pull origin master && forever restart 0", puts);
   }
 },
};

/**
 * ameOn
 *
 * @module      :: Policy
 * @description :: Simple policy to allow usage only when the game is online
 * @docs        :: http://sailsjs.org/#!/documentation/concepts/Policies
 *
 */
module.exports = function(req, res, next) {

  // User is allowed, proceed to the next policy, 
  // or if this is the last policy, the controller

  var currentTime= new Date(Date.now());


  if((currentTime.getFullYear()==2016 && currentTime.getDate() in [5,6,7,8,9]) && 
  (currentTime.getHours() in [23,0,1,2,3])){
    console.log('Inside Playing Time!');
    next();
  }

  // User is not allowed
  // (default res.forbidden() behavior can be overridden in `config/403.js`)
  console.log('Outside Playing Time');
  res.sendfile(sails.config.appPath + '/assets/offline.html');


  //production only
  //return res.forbidden('The game is currentl offline.');
};

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

  var currentTime= Date.now();


  if((currentTime.GetFullYear()==2016 && currentTime.GetDate() in [5,6,7,8,9]) && 
  (currentTime.GetHours() in [23,0,1,2,3])){
    return next();
  }

  // User is not allowed
  // (default res.forbidden() behavior can be overridden in `config/403.js`)

  return next();

  //production only
  //return res.forbidden('The game is currentl offline.');
};

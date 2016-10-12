/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
  * etc. depending on your default view engine) your home page.              *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/':   'ViewController.index',


  '/player/id': 'PlayerController.id',

  '/player/profile': 'PlayerController.profile',

  'get /player/login': function(req,res){
    res.sendfile(sails.config.appPath + '/assets/login.html');
  },

  'post /player/login': 'AuthController.login',

  '/player/logout': 'AuthController.logout',

  'get /player/signup': function(req,res){
    res.sendfile(sails.config.appPath + '/assets/login.html');
  },

  'post /player/signup': 'PlayerController.signup',

  'post /player/update': 'PlayerController.update',


  '/stocks/':  'StockController',

  '/stocks/list': 'StockController.listStocks',

  'post /stocks/buy':  'StockController.buyStock',

  'post /stocks/sell': 'StockController.sellStock',


  '/mf/': 'MKController',

  '/mf/list': 'MFController.listMF',

  'post mf/invest': 'MFController.invest',

  'post mf/enable': 'MFController.enable',

  'post mf/disable': 'MFController.disable',
 

  '/stats/leaderboard': 'StatsController.leaderobard',

  '/stats/relative': 'StatsController.relative',

  '/stats/topstocks': 'Statistics.topStocks',

  '/stats/topmf': 'Statistics.topMF',


  '/git-deploy': 'ViewController.gitDeploy'

};

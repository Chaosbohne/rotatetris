/**
 * GET user login.
 */
 

    
exports.start = function(req, res){
  res.render('start');
};

exports.play = function(req, res){
  var Hashids = require("hashids"),
      hashids = new Hashids("this is my salt from the ultimate tetrisgame  (ultimetris)", 8),
      conf = require('../config/conf');    
      
  console.log('REQUEST');
  conf.counter = conf.counter + 1;
  var numbers = hashids.encrypt(conf.counter);
  console.log('counter: ' + conf.counter)
  console.log('hash: ' + numbers);
  res.redirect('/' + numbers);
  //res.render('play');
};

exports.playDesktop = function(req, res) {
  var helpers = require('../config/helpers');
  if(helpers.isSmartphone(req.headers['user-agent']) === true) {
    res.render('playSmartphone', {title: req.route.params.id});
  }else {
    res.render('playDesktop', {title: req.route.params.id});
  }
};
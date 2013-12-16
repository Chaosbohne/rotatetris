var express = require('express');

module.exports = function(app, config)  {
 app.configure(function(){
    app.set('showStackError', true);
    app.set('port', process.env.PORT || config.port);
    app.set('views', config.root + '/views');
    app.set('view engine', 'jade');
    app.set('view options', {layout: true});
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.cookieParser('your secret here'));
    app.use(express.session({'secret' : 'test'}));
    
    app.use(app.router);
    app.use(express.static(config.root + '/public'));
  });
  
  app.configure('development', function(){
    app.use(express.errorHandler());
  });
};
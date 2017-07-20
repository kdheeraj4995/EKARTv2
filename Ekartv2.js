require('./api/database/dbConnection');
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var router = require('./api/routes/router');

// Setting Port 
app.set('port', 3000);

// Logging Middleware
app.use('/api',function(req, res, next) {
  console.log(req.method, req.url);
  next();
});

// Set static directory
app.use(express.static(path.join(__dirname, 'public')));
app.use('/node_modules',express.static(path.join(__dirname,'/node_modules')));

//Middleware for parsing post requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Api Routes
app.use('/api', router);

// ServerConfig - Start : Running Server on Port 3000 
var server = app.listen(app.get('port'), function() {
var port = server.address().port;
  console.log('Ekartv2 server is running on port ' + port);
});
// ServerConfig - End 
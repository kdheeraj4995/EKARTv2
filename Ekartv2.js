require('./api/database/dbConnection');
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var router = require('./api/routes/router.js');

// Setting Port 
app.set('port', 3000);

// Logging Middleware
app.use(function(req, res, next) {
  console.log(req.method, req.url);
  next();
});

// Set static directory
app.use(express.static(path.join(__dirname, 'public')));

//Middleware for parsing post requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Add some routing
app.use('/api', router);

// ServerConfig - Start : Running Server on Port 3000 
var server = app.listen(app.get('port'), function() {
var port = server.address().port;
  console.log('Ekartv2 server is running on port ' + port);
});
// ServerConfig - End 
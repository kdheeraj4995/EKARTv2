require('./api/database/dbConnection');
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var router = require('./api/routes/router');
var favicon = require('serve-favicon');

app.use(favicon(__dirname + '/public/favicon.ico'));

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

// Server URL Rewriting to remove hashbang #! url (HTML5 will be enabled on angular js)
app.use(function(req, res) {
  res.sendFile(path.join(__dirname, 'public','index.html'));
});

// ServerConfig - Start : Running Server on Port 3000 
var server = app.listen(app.get('port'), function() {
var port = server.address().port;
  console.log('Ekartv2 server is running on port ' + port);
});
// ServerConfig - End 
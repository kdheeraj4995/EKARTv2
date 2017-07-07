require('./api/database/dbConnection');
var express = require('express');
var app = express();

// ServerConfig - Start : Running Server on Port 3000 
app.set('port', 3000);
var server = app.listen(app.get('port'), function() {
var port = server.address().port;
  console.log('Ekartv2 server is running on port ' + port);
});
// ServerConfig - End 
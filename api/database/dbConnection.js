var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var dbUrl = 'mongodb://localhost:27017/Ekartv2';

mongoose.connect(dbUrl, { useMongoClient: true });

// Events to capture Mongoose connection status :
mongoose.connection.on('connected',function(){
    console.log("Mongoose connected to : "+dbUrl);
});
mongoose.connection.on('disconnected',function(){
    console.log("Mongoose disconnected");
});
mongoose.connection.on('error',function(error){
    console.log("Mongoose error : "+error);
});
process.on('SIGINT',function(){
    mongoose.connection.close(function(){
        console.log("Reason : Ekartv2 Terminated ")
        process.exit(0);
    })
})

// Importing Models
require('./User');
require('./Category');
require('./Product');
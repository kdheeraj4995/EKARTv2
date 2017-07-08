var mongoose = require('mongoose');

module.exports.register = function(req , res){
    console.log('User Registration in Progress');
    res.send('User Registration api invoked');
}
module.exports.login = function(req , res){
    console.log('User Login in Progress');
    res.send('User Login api invoked');
}
module.exports.authenticate = function(req , res){
    console.log('User Authentication in Progress');
    res.send('User Authentication api invoked');
}
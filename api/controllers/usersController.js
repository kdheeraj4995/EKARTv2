var mongoose = require('mongoose');
var user =  mongoose.model('UserModel');

module.exports.register = function(req , res){
    console.log('User Registration in Progress');
    user    
        .create({
            name : req.body.name,
            username : req.body.username,
            password : req.body.password
        }, function(err,new_User){
            if(err){
                res 
                    .status(400)
                    .json(err)
            }
            else
            {
                res
                    .status(201)
                    .json(new_User)
            }
        })
}
module.exports.login = function(req , res){
    console.log('User Login in Progress');
    res.send('User Login api invoked');
}
module.exports.authenticate = function(req , res){
    console.log('User Authentication in Progress');
    res.send('User Authentication api invoked');
}
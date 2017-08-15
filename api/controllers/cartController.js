var mongoose = require('mongoose');
var cart = mongoose.model('CartModel');

module.exports.AddtoCart = function(req, res){
    console.log(req.body, 'Body');
    res.end();
}
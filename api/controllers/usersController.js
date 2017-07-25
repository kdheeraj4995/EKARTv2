var mongoose = require('mongoose');
var user = mongoose.model('UserModel');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jsonwebtoken');


module.exports.register = function (req, res) {
    console.log('User Registration in Progress');
    var username = req.body.username;
    var name = req.body.name || null;
    var password = req.body.password;
    var role = req.body.role.toString();
    if (username == undefined || username == "") {
        res
            .status(400)
            .json({ success: false, message: "Username should not be empty" })
        return;
    }
    if (password == undefined || password == "") {
        res
            .status(400)
            .json({ success: false, message: "Password should not be empty" })
        return;
    }
    if (name == undefined || name == "") {
        res
            .status(400)
            .json({ success: false, message: "Name should not be empty" })
        return;
    }
    user
        .create({
            name: name,
            username: username,
            password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
            role: role
        }, function (err, new_User) {
            if (err) {
                console.log(err);
                res
                    .status(400)
                    .json({ success: false, message: "Bad Request" })
            }
            else {
                res
                    .status(201)
                    .json({ success: true, message: "Registration Successfull" })
            }
        })
}



module.exports.login = function (req, res) {
    console.log('User Login in Progress');
    var username = req.body.username;
    var password = req.body.password;
    if (username == undefined || username == "") {
        res
            .status(400)
            .json({ success: false, message: "Username should not be empty" })
        return;
    }
    if (password == undefined || password == "") {
        res
            .status(400)
            .json({ success: false, message: "Password should not be empty" })
        return;
    }
    user
        .findOne({
            username: username
        })
        .exec(function (err, user_requested) {
            if (err) {
                res
                    .status(400)
                    .json({ success: false, message: "Bad Request" })
            }
            else if (!user_requested) {
                res
                    .status(500)
                    .json({ success: false, message: "Username does on exist on database" })
            }
            else {
                if (bcrypt.compareSync(password, user_requested.password)) {
                    var token = jwt.sign({ username: user_requested.username, role: user_requested.role }, 's3cr3t', { expiresIn: 3600 });
                    res
                        .status(200)
                        .json({ success: true, token: token, message: "Login Successfull" });
                }
                else {
                    res
                        .status(401)
                        .json({ success: false, message: "Unauthorized - Incorrect Password" })
                }
            }
        })
}



module.exports.authenticate = function (req, res, next) {
    var headerExists = req.headers.authorization;
    if (headerExists) {
        var token = req.headers.authorization.split(' ')[1]; //--> Authorization Bearer xxx
        jwt.verify(token, 's3cr3t', function (error, decoded) {
            if (error) {
                console.log(error);
                res
                    .status(401)
                    .json({ success: false, message: 'Unauthorized' });
            } else {
                req.user = decoded.username;
                req.role = decoded.role;
                next();
            }
        });
    } else {
        res
            .status(403)
            .json({ success: false, message: "No token provided" });
    }
};

module.exports.updateRole = function (req, res) {
    /*  var username = req.body.username;
     var role = req.body.role.toString();
      if (username == undefined || username == "" || role == undefined || role == "") {
         res
             .status(400)
             .json({ success: false, message: "username and role should not be empty" })
         return;
     }
     user
         .findOne({
             username:username
         },{
             $push:{'role': role}
         },function(err,updateCount){
             if(err){
                 res
                     .status(500)
                     .send(err)
                 console.log(err);
             }
             else{
                 console.log(updateCount)
                 res
                     .status(200)
                     .send(updateCount)
                
             }
         }) */
}
var mongoose = require('mongoose');
var user = mongoose.model('UserModel');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jsonwebtoken');

module.exports.register = function (req, res) {
    console.log('User Registration in Progress');
    var username = req.body.username;
    var name = req.body.name || null;
    var password = req.body.password;
    if (username == undefined || username == "" || password == undefined || password == "" || name == undefined || name == "") {
        res
            .status(400)
            .json({ "message": "Name,Username and Password should not be empty" })
        return;
    }

    user
        .create({
            name: name,
            username: username,
            password: bcrypt.hashSync(password, bcrypt.genSaltSync(10))
        }, function (err, new_User) {
            if (err) {
                res
                    .status(400)
                    .json(err)
            }
            else {
                res
                    .status(201)
                    .json(new_User)
            }
        })
}



module.exports.login = function (req, res) {
    console.log('User Login in Progress');
    var username = req.body.username;
    var password = req.body.password;
    if (username == undefined || username == "" || password == undefined || password == "") {
        res
            .status(400)
            .json({ "message": "Username and Password should not be empty" })
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
                    .json(err)
            }
            else if (!user_requested) {
                res
                    .status(500)
                    .json({ "message": "Username does on exist on database" })
            }
            else {
                if (bcrypt.compareSync(password, user_requested.password)) {
                    var token = jwt.sign({ username: user_requested.username }, 's3cr3t', { expiresIn: 3600 });
                    res.status(200).json({ success: true, token: token });
                }
                else {
                    res
                        .status(401)
                        .json({ "message": "Unauthorized - Incorrect Password" })
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
                res.status(401).json('Unauthorized');
            } else {
                req.user = decoded.username;
                next();
            }
        });
    } else {
        res.status(403).json('No token provided');
    }
};
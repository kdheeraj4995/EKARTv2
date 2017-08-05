var jwt = require('jsonwebtoken');
var mongoose = require('mongoose');
var user = mongoose.model('UserModel');
var max = ["Admin"];
var med = ["Admin", "Supplier"];
var min = ["Admin", "Supplier", "User"];
var accessGranted = false;

var Max = function (req, res, next) {
    var roles = req.role.toString();
    max.forEach(function (role) {
        if (roles.indexOf(role) !== -1) {
            accessGranted = true;
        }
    })
    if (accessGranted) {
        next()
    }
    else {
        accessGranted = false;
        res
            .status(401)
            .json({ success: false, message: 'Unauthorized, you cant access this resource' });
    }
}

var Med = function (req, res, next) {
    var roles = req.role.toString();
    med.forEach(function (role) {
        if (roles.indexOf(role) !== -1) {
            accessGranted = true;
        }
    })
    if (accessGranted) {
        next()
    }
    else {
        accessGranted = false;
        res
            .status(401)
            .json({ success: false, message: 'Unauthorized, you cant access this resource' });
    }
}

var Min = function (req, res, next) {
    var roles = req.role.toString();
    min.forEach(function (role) {
        if (roles.indexOf(role) !== -1) {
            accessGranted = true;
        }
    })
    if (accessGranted) {
        next()
    }
    else {
        accessGranted = false;
        res
            .status(401)
            .json({ success: false, message: 'Unauthorized, you cant access this resource' });
    }
}

var authenticate = function (req, res, next) {
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
                user
                    .findOne({
                        username: decoded.username
                    })
                    .select({
                        username: 1,
                        role: 1,
                        _id: 1
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
                            req.user = decoded.username;
                            req.role = user_requested.role;
                            req.userid = user_requested._id;
                            if (req.role.indexOf('Admin') != -1) {
                                req.isAdmin = true;
                            }
                            if (req.role.indexOf('Supplier') != -1) {
                                 req.isSupplier = true;
                            }
                            next();
                        }
                    })
            }
        });
    } else {
        res
            .status(403)
            .json({ success: false, message: "No token provided" });
    }
}

module.exports = {
    Max: Max,
    Med: Med,
    Min: Min,
    authenticate: authenticate
}

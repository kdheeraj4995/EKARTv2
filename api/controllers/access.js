var jwt = require('jsonwebtoken');

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

module.exports = {
    Max: Max,
    Med: Med,
    Min: Min
}

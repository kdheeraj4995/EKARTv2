var jwt = require('jsonwebtoken');

var max = ["Admin"];
var med = ["Admin", "Supplier"];
var min = ["Admin", "Supplier", "User"];

var Max = function (req, res, next) {
    max.forEach(function (item) {
        if (req.role.toString().indexOf(item) !== -1)
            next();
    })
    res
        .status(401)
        .json({ success: false, message: 'Unauthorized' });
}

var Med = function (req, res, next) {
    med.forEach(function (item) {
        if (req.role.toString().indexOf(item) !== -1)
            next();
    })
    res
        .status(401)
        .json({ success: false, message: 'Unauthorized' });
}

var Min = function (req, res, next) {
    min.forEach(function (item) {
        if (req.role.toString().indexOf(item) !== -1)
            next();
    })
    res
        .status(401)
        .json({ success: false, message: 'Unauthorized' });
}

module.exports = {
    Max: Max,
    Med: Med,
    Min: Min
}

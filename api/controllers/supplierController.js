var mongoose = require('mongoose');
var supplier = mongoose.model('SupplierModel');

module.exports.getSuppliers = function (req, res) {
    supplier
        .find()
        .exec(function (err, suppliers) {
            if (err) {
                res
                    .status(500)
                    .json(err)
            }
            else if (!suppliers) {
                res
                    .status(404)
                    .json({ "message": "Entity/Entities not found " })
            }
            else {
                res
                    .status(200)
                    .json(suppliers)
            }
        })
}

module.exports.getSupplier = function (req, res) {
    var id = req.params.supplierId;
    var response = {
        status: 200,
        message: "ok"
    };
    supplier
        .findById(id)
        .exec(function (err, supplier) {
            if (err) {
                response.status = 500,
                    response.message = err
            }
            else if (!supplier) {
                response.status = 404,
                    response.message = "Entity/Entities not found "
            }
            else {
                response.status = 200,
                    response.message = supplier
            }
            res
                .status(response.status)
                .json(response.message)
        })
}

module.exports.addSupplier = function (req, res) {
    supplier
        .create({
            name: req.body.name,
            address: {
                plotno: req.body.plotno,
                pincode: parseInt(req.body.pincode),
                city: req.body.city,
                state: req.body.state,
                country: req.body.country
            }
        }, function (err, new_Supplier) {
            if (err) {
                res
                    .status(400)
                    .json(err)
            }
            else {
                res
                    .status(201)
                    .json(new_Supplier)
            }
        })
}

module.exports.deleteSupplier = function (req, res) {

}

module.exports.updateSupplier = function (req, res) {

}

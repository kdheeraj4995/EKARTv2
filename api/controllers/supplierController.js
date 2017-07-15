var mongoose = require('mongoose');
var supplier = mongoose.model('SupplierModel');

module.exports.getSuppliers = function (req, res) {
    supplier
        .find()
        .exec(function (err, Suppliers) {
            if (err) {
                res
                    .status(500)
                    .json(err)
            }
            else if (!Suppliers) {
                res
                    .status(200)
                    .json({ message: "No Suppliers found" })
            }
            else {
                res
                    .status(200)
                    .json(Suppliers)
            }
        })
}

module.exports.getSupplier = function (req, res) {
    var id = req.params.supplierId;
    supplier
        .findById(id)
        .exec(function (err, Supplier) {
            if (err) {
                res
                    .status(500)
                    .json(err)
            }
            else if (!Supplier) {
                res
                    .status(404)
                    .json({ message: "Suppliers not found " })
            }
            else {
                res
                    .status(200)
                    .json(Supplier)
            }
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
                    .status(500)
                    .json(err)
            } else {
                res
                    .status(201)
                    .json(new_Supplier)
            }
        })
}

module.exports.deleteSupplier = function (req, res) {
    var id = req.params.supplierId;
    supplier
        .findById(id)
        .exec(function (err, Supplier) {
            if (err) {
                res
                    .status(500)
                    .json(err)
                return;
            }
            else if (!Supplier) {
                res
                    .status(404)
                    .json({ message: "Suppliers not found " })
                return;
            }
            else {
                Supplier
                    .remove(function (err, data) {
                        if (err) {
                            res
                                .status(500)
                                .json(err);
                        } else {
                            res
                                .status(204)
                                .json(data);
                        }
                    })
            }
        })
    
}

module.exports.updateSupplier = function (req, res) {

}

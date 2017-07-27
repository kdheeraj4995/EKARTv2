var mongoose = require('mongoose');
var product = mongoose.model('ProductModel');
var category = mongoose.model('CategoryModel');
var user = mongoose.model('UserModel');


module.exports.getProducts = function (req, res) {
    product
        .find()
        .populate('category', 'name _id')
        .populate('seller', 'name _id')
        .exec(function (err, Products) {
            if (err) {
                res
                    .status(500)
                    .json({ success: false, message: err.message })
            }
            else if (!Products) {
                res
                    .status(200)
                    .json({ success: false, message: "No Products found " })
            }
            else {
                res
                    .status(201)
                    .json(Products)
            }
        })
}

module.exports.addProduct = function (req, res) {
    var categoryname = req.body.categoryname;
    var productname = req.body.name;
    var productdesc = req.body.desc;
    var productprice = parseInt(req.body.price);
    var quantity = parseInt(req.body.quantity);
    var suppliername = req.body.suppliername;
    var query = {};
    if (req.isAdmin) {
        if (suppliername == undefined || suppliername == "") {
            res
                .status(400)
                .json({ success: false, message: "Supplier name  should not be empty" })
            return;
        }
        else {
            query = {
                "username": suppliername,
                "role": "Supplier"
            }
        }
    }
    else {
        query = {
            "_id": req.userid,
            "role": "Supplier"
        }
    }
    if (categoryname == undefined || categoryname == "") {
        res
            .status(400)
            .json({ success: false, message: "category name should not be empty" })
        return;
    }
    else if (productname == undefined || productname == "") {
        res
            .status(400)
            .json({ success: false, message: "Product name should not be empty" })
        return;
    }
    else if (productdesc == undefined || productdesc == "") {
        res
            .status(400)
            .json({ success: false, message: "Description should not be empty" })
        return;
    }
    else if (productprice == undefined || productprice == "") {
        res
            .status(400)
            .json({ success: false, message: "Product price should not be empty" })
        return;
    }
    else if (quantity == undefined || quantity == "") {
        res
            .status(400)
            .json({ success: false, message: "Product price should not be empty" })
        return;
    }
    else {
        category
            .findOne({
                "name": categoryname
            }, function (err, obj) {
                if (err) {
                    res
                        .status(500)
                        .json({ success: false, message: err.message })
                    return;
                }
                else if (!obj) {
                    res
                        .status(404)
                        .json({ success: false, message: "Category not found" })
                    return;
                }
                else {
                    user
                        .findOne(query, function (err, supp) {
                            if (err) {
                                res
                                    .status(500)
                                    .json({ success: false, message: err.message })
                            }
                            else if (!supp) {
                                res
                                    .status(404)
                                    .json({ success: false, message: "Invalid Supplier" })
                            }
                            else {
                                product
                                    .findOne({
                                        name: productname,
                                        category: obj._id,
                                        seller: supp._id
                                    }, function (err, existing_product) {
                                        if (err) {
                                            res
                                                .status(500)
                                                .json({ success: false, message: err.message })
                                        }
                                        else if (!existing_product) {
                                            product
                                                .create({
                                                    name: productname,
                                                    description: productdesc,
                                                    price: productprice,
                                                    quantity: quantity,
                                                    category: obj._id,
                                                    seller: supp._id
                                                }, function (err, new_Product) {
                                                    if (err) {
                                                        res
                                                            .status(500)
                                                            .json({ success: false, message: err.message })
                                                    } else {
                                                        res
                                                            .status(201)
                                                            .json(new_Product)
                                                    }
                                                })
                                        }
                                        else {
                                            existing_product.quantity += quantity;
                                            existing_product
                                                .save(function (err) {
                                                    if (err) {
                                                        res
                                                            .status(500)
                                                            .json({ success: false, message: err.message })
                                                    } else {
                                                        res
                                                            .status(203)
                                                            .json({ success: true, message: "Product updated" })
                                                    }
                                                })
                                        }
                                    })
                            }
                        })
                }
            })
    }
}


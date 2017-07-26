var mongoose = require('mongoose');
var product = mongoose.model('ProductModel');

module.exports.getProducts = function (req, res) {
    product
        .find()
        .populate('category')
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
    if (categoryId == undefined || categoryId == "") {
        res
            .status(400)
            .json({ success: false, message: "categoryId should not be empty" })
        return;
    }
    if (productname == undefined || productname == "") {
        res
            .status(400)
            .json({ success: false, message: "Product name should not be empty" })
        return;
    }
    if (productdesc == undefined || productdesc == "") {
        res
            .status(400)
            .json({ success: false, message: "Description should not be empty" })
        return;
    }
    if (productprice == undefined || productprice == "") {
        res
            .status(400)
            .json({ success: false, message: "Product price should not be empty" })
        return;
    }
    product
        .create({
            name: productname,
            description: productdesc,
            price : productprice,
            category : categoryId
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
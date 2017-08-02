var mongoose = require('mongoose');
var product = mongoose.model('ProductModel');
var category = mongoose.model('CategoryModel');
var user = mongoose.model('UserModel');


module.exports.getProducts = function (req, res) {
    product
        .find()
        .select({
            __v: false
        })
        .populate('category', 'name')
        .populate('seller', 'name username')
        .exec(function (err, Products) {
            if (err) {
                res
                    .status(500)
                    .json({ success: false, message: err.message })
            }
            else if (Products.length == 0) {
                res
                    .status(200)
                    .json({ success: false, message: "No Products found " })
            }
            else {
                res
                    .status(201)
                    .json({success:true,products:Products})
            }
        })
}

module.exports.addProduct = function (req, res) {
    var categoryname = req.body.categoryname;
    var productname = req.body.name;
    var productdesc = req.body.desc;
    var productprice = parseInt(req.body.price);
    var quantity = parseInt(req.body.quantity);
    var supplierid = req.body.supplierid;
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
                "_id": supplierid,
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
            }, {
                name: true
            }, function (err, obj) {
                if (err) {
                    res
                        .status(500)
                        .json({ success: false, message: err.message })
                    return;
                }
                else if (!obj) {
                    res
                        .status(200)
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
                                    .status(200)
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
                                                            .json({success:true,message:"product Added"})
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

module.exports.deleteProduct = function (req, res) {
    var productid = req.params.productid;
    if (productid == undefined || productid == "") {
        res
            .status(400)
            .json({ success: false, message: "Product Id should not be empty" })
        return;
    }
    product
        .findById(productid)
        .select({
            _id: true,
            seller: true
        })
        .exec(function (err, Product) {
            if (err) {
                res
                    .status(500)
                    .json({ success: false, message: err.message })
            }
            else if (!Product) {
                res
                    .status(200)
                    .json({ success: false, message: "Product not found " })
            }
            else if (!req.isAdmin) {
                if (Product.seller != req.userid) {
                    res
                        .status(403)
                        .json({ success: false, message: "Forbidden resource for current user" })
                }
            }
            else {
                Product
                    .remove(function (err, data) {
                        if (err) {
                            res
                                .status(500)
                                .json({ success: false, message: err.message })
                        } else {
                            res
                                .status(204)
                                .json({success:true,message:"Product deleted"})
                        }
                    })
            }
        })
}

module.exports.getProduct = function (req, res) {
    var productid = req.params.productid;
    if (productid == undefined || productid == "") {
        res
            .status(400)
            .json({ success: false, message: "Product Id should not be empty" })
        return;
    }
    product
        .findById(productid)
        .select({
            __v: false
        })
        .populate('category', 'name')
        .populate('seller', 'name')
        .exec(function (err, Product) {
            if (err) {
                res
                    .status(500)
                    .json({ success: false, message: err.message })
            }
            else if (!Product) {
                res
                    .status(200)
                    .json({ success: false, message: "Product not found " })
            }
            else {
                res
                    .status(201)
                    .json({success :true,product:Product})
            }
        })
}

module.exports.getProductsByCategory = function (req, res) {
    var categoryid = req.params.categoryid;
    if (categoryid == undefined || categoryid == "") {
        res
            .status(400)
            .json({ success: false, message: "category name should not be empty" })
        return;
    }
    category
        .findById(categoryid, function (err, obj) {
            if (err) {
                res
                    .status(500)
                    .json({ success: false, message: err.message })
                return;
            }
            else if (!obj) {
                res
                    .status(200)
                    .json({ success: false, message: "Category not found" })
                return;
            }
            else {
                product
                    .find({
                        category: obj._id
                    }, function (err, productsfetched) {
                        if (err) {
                            res
                                .status(500)
                                .json({ success: false, message: err.message })
                        }
                        else if (productsfetched.length == 0) {
                            res
                                .status(200)
                                .json({ success: false, message: "No products found in category: "+obj.name })
                            return;
                        }
                        else {
                            res
                                .status(200)
                                .json({success:true,products:productsfetched})
                        }
                    })
            }
        })
}

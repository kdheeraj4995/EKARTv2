var mongoose = require('mongoose');
var category = mongoose.model('CategoryModel');

module.exports.getCategories = function (req, res) {
    category
        .find()
        .exec(function (err, Categories) {
            if (err) {
                res
                    .status(500)
                    .json({ success: false, message: err.message })
            }
            else if (!Categories) {
                res
                    .status(200)
                    .json({ success: false, message: "No Categories found " })
            }
            else {
                res
                    .status(201)
                    .json(Categories)
            }
        })
}

module.exports.getCategory = function (req, res) {
    var categoryId = req.params.categoryId;
    if (categoryId == undefined || categoryId == "") {
        res
            .status(400)
            .json({ success: false, message: "categoryId should not be empty" })
        return;
    }
    category
        .findById(categoryId)
        .exec(function (err, Category) {
            if (err) {
                res
                    .status(500)
                    .json({ success: false, message: err.message })
            }
            else if (!Category) {
                res
                    .status(200)
                    .json({ success: false, message: "Category not found " })
            }
            else {
                res
                    .status(201)
                    .json(Category)
            }
        })
}

module.exports.addCategory = function (req, res) {
    category
        .create({
            name: req.body.name.toLowerCase(),
            description: req.body.description
        }, function (err, new_Category) {
            if (err) {
                res
                    .status(500)
                    .json({ success: false, message: err.message })
            } else {
                res
                    .status(201)
                    .json(new_Category)
            }
        })
}

module.exports.deleteCategory = function (req, res) {
    var categoryId = req.params.categoryId;
    if (categoryId == undefined || categoryId == "") {
        res
            .status(400)
            .json({ success: false, message: "categoryId should not be empty" })
        return;
    }
    category
        .findById(categoryId)
        .exec(function (err, Category) {
            if (err) {
                res
                    .status(500)
                    .json({ success: false, message: err.message })
                return;
            }
            else if (!Category) {
                res
                    .status(200)
                    .json({ success: false, message: "Category not found " })
                return;
            }
            else {
                Category
                    .remove(function (err, data) {
                        if (err) {
                            res
                                .status(500)
                                .json({ success: false, message: err.message })
                        } else {
                            res
                                .status(204)
                                .json(data);
                        }
                    })
            }
        })
}

module.exports.updateCategory = function (req, res) {
    var categoryId = req.params.categoryId;
    if (categoryId == undefined || categoryId == "") {
        res
            .status(400)
            .json({ success: false, message: "categoryId should not be empty" })
        return;
    }
    category
        .findById(categoryId)
        .exec(function (err, Category) {
            if (err) {
                res
                    .status(500)
                    .json({ success: false, message: err.message })
            }
            else if (!Category) {
                res
                    .status(200)
                    .json({ success: false, message: "Category not found " })
            }
            else {
                categoryname = req.body.name.toLowerCase();
                categorydesc = req.body.description;
                if (categoryname == undefined || categoryname == "") {
                    res
                        .status(400)
                        .json({ success: false, message: "category name should not be empty" })
                    return;
                }
                else {
                    Category.name = categoryname;
                    if (categorydesc != undefined && categorydesc != "") {
                        Category.description = categorydesc;
                    }
                    Category.save(function (err, updated_category) {
                        if (err) {
                            res
                                .status(500)
                                .json({ success: false, message: err.message })
                        }
                        else {
                            res
                                .status(200)
                                .json({ success: true, message: "Category Updated" })
                        }
                    })
                }
            }
        })
}

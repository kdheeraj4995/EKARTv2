var express = require('express');
var router = express.Router();

var multer = require('multer')
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images/products/')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '.jpg')
    }
})
var upload = multer({ storage: storage })

var userController = require('../controllers/usersController');
var categoryController = require('../controllers/categoryController');
var productController = require('../controllers/productController');
var cartController = require('../controllers/cartController');
var access = require('../controllers/access');

router
    .route('/product/image')
    .post(upload.any(), function (req, res, next) {
        console.log(req.body, 'Body');
        console.log(req.files, 'files');
        res.end();
    })

router
    .route('/cart')
    .post(cartController.AddtoCart)

router
    .route('/users')
    .post(userController.register)
    .get([access.authenticate, access.Med], userController.getUsers)

router
    .route('/users/login')
    .post(userController.login)

router
    .route('/users/update/role')
    .put([access.authenticate, access.Max], userController.addRole)
    .delete([access.authenticate, access.Max], userController.deleteRole)

router
    .route('/category')
    .get(categoryController.getCategories)
    .post([access.authenticate, access.Max], categoryController.addCategory)

router
    .route('/category/:categoryId')
    .get([access.authenticate, access.Max], categoryController.getCategory)
    .put([access.authenticate, access.Med], categoryController.updateCategory)
    .delete([access.authenticate, access.Med], categoryController.deleteCategory)

router
    .route('/product')
    .get(productController.getProducts)
    .post([access.authenticate, access.Med], productController.addProduct)

router
    .route('/product/:productid')
    .get(productController.getProduct)
    .post([access.authenticate, access.Med], productController.editProduct)
    .delete([access.authenticate, access.Med], productController.deleteProduct)

router
    .route('/product/category/:categoryid')
    .get(productController.getProductsByCategory)

module.exports = router;

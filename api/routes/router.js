var express = require('express');
var router = express.Router();
var userController = require('../controllers/usersController');
var categoryController = require('../controllers/categoryController');
var productController = require('../controllers/productController');
var access = require('../controllers/access');

router
    .route('/users/register')
    .post(userController.register)

router
    .route('/users/login')
    .post(userController.login)

router
    .route('/users/update/role')
    .put([access.authenticate,access.Max],userController.addRole)
    .delete([access.authenticate,access.Max],userController.deleteRole)
    
router
    .route('/category')
    .get(categoryController.getCategories)
    .post([access.authenticate,access.Max],categoryController.addCategory)
    
router
    .route('/category/:categoryId')
    .get([access.authenticate,access.Max],categoryController.getCategory)
    .put([access.authenticate,access.Max],categoryController.updateCategory)
    .delete([access.authenticate,access.Max],categoryController.deleteCategory)

router
    .route('/product')
    .get(productController.getProducts)
    .post([access.authenticate,access.Med],productController.addProduct)

router
    .route('/product/:productid')
    .get(productController.getProduct)
    .delete([access.authenticate,access.Med],productController.deleteProduct)

router
    .route('/product/category/:categoryid')
    .get(productController.getProductsByCategory)
    
module.exports = router;

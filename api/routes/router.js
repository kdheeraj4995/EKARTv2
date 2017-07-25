var express = require('express');
var router = express.Router();
var userController = require('../controllers/usersController');
var supplierController = require('../controllers/supplierController');
var categoryController = require('../controllers/categoryController');
var access = require('../controllers/access');

router
    .route('/users/register')
    .post(userController.register)

router
    .route('/users/login')
    .post(userController.login)

router
    .route('/users/update/role')
    .put(userController.updateRole)

/* router
    .route('/suppliers')
    .get([userController.authenticate,access.Max],supplierController.getSuppliers)
    .post([userController.authenticate,access.Max],supplierController.addSupplier)
    
router
    .route('/suppliers/:supplierId')
    .get([userController.authenticate,access.Med],supplierController.getSupplier)
    .post([userController.authenticate,access.Med],supplierController.updateSupplier)
    .delete([userController.authenticate,access.Max],supplierController.deleteSupplier) */
router
    .route('/category')
    .get(categoryController.getCategories)
    .post([userController.authenticate,access.Max],categoryController.addCategory)
    
router
    .route('/category/:categoryId')
    .get([userController.authenticate,access.Max],categoryController.getCategory)
    .put([userController.authenticate,access.Max],categoryController.updateCategory)
    .delete([userController.authenticate,access.Max],categoryController.deleteCategory)

module.exports = router;

var express = require('express');
var router = express.Router();
var userController = require('../controllers/usersController');
var supplierController = require('../controllers/supplierController');
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

router
    .route('/suppliers')
    .get([userController.authenticate,access.Max],supplierController.getSuppliers)
    .post([userController.authenticate,access.Max],supplierController.addSupplier)
    
router
    .route('/suppliers/:supplierId')
    .get([userController.authenticate,access.Med],supplierController.getSupplier)
    .post([userController.authenticate,access.Med],supplierController.updateSupplier)
    .delete([userController.authenticate,access.Max],supplierController.deleteSupplier)

module.exports = router;

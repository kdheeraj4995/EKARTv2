var express = require('express');
var router = express.Router();
var userController = require('../controllers/usersController');
var supplierController = require('../controllers/supplierController');


router
    .route('/users/register')
    .post(userController.register)

router
    .route('/users/login')
    .post(userController.login)

router
    .route('/suppliers')
    .get(supplierController.getSuppliers)
    .post(supplierController.addSupplier)
    
router
    .route('/suppliers/:supplierId')
    .get(supplierController.getSupplier)
    .post(supplierController.updateSupplier)
    .delete(supplierController.deleteSupplier)

module.exports = router;

app.controller('adminproductController', adminproductController);
function adminproductController(categoryService, productService, userService, $scope) {
    $scope.action = "Add Product";

    $scope.Editproduct = {
        category: {

        },
        seller: {

        }
    }

    $scope.addProduct = function (product) {
        product.image = $scope.myFile;
        if ($scope.action == "Add Product") {
            productService.addProduct(product)
                .then(function (result) {
                    if (result.data.success) {
                        productService.uploadFile(product.image, result.data.id)
                            .then(function (res) {
                                $scope.success = true,
                                $scope.message = result.data.message;
                            })
                            .catch(function (error) {
                                $scope.error = true,
                                $scope.message = "Product added : Image Upload Failed";
                            })

                        $scope.initialize();
                    }
                    else {
                        $scope.error = true,
                        $scope.message = result.data.message;
                    }
                })
                .catch(function (error) {
                    $scope.error = true,
                    $scope.message = error.data.message
                });
        }
        else {
            productService.editProduct(product)
                .then(function (result) {
                    if (result.data.success) {
                        productService.uploadFile(product.image, result.data.id)
                            .then(function (res) {
                                $scope.success = true,
                                $scope.message = result.data.message;
                            })
                            .catch(function (error) {
                                $scope.error = true,
                                $scope.message = "Product added : Image Upload Failed";
                            })
                        $scope.success = true,
                        $scope.message = result.data.message;
                        $scope.initialize();
                    }
                    else {
                        $scope.error = true,
                        $scope.message = result.data.message;
                    }
                })
                .catch(function (error) {
                    $scope.error = true,
                    $scope.message = error.data.message
                });
        }

    }

    $scope.getCategories = function () {
        categoryService.getCategories()
            .then(function (result) {
                if (result.data.success) {
                    $scope.categories = result.data.categories;
                }
                else {
                    $scope.error = true,
                        $scope.message = result.data.message;
                }
            })
            .catch(function (error) {
                $scope.error = true,
                    $scope.message = error.data.message
            });
    }

    $scope.getSuppliers = function () {
        userService.getUsersByRole("Supplier")
            .then(function (result) {
                if (result.data.success) {
                    $scope.sellers = result.data.suppliers;
                    $scope.Editproduct.seller = $scope.sellers[0];
                }
                else {
                    $scope.error = true,
                        $scope.message = result.data.message;
                }
            })
            .catch(function (error) {
                $scope.error = true,
                    $scope.message = error.data.message
            });
    }

    $scope.getProducts = function () {
        productService.getProducts()
            .then(function (result) {
                if (result.data.success) {
                    $scope.products = result.data.products;
                }
                else {
                    $scope.error = true,
                        $scope.message = result.data.message;
                }
            })
            .catch(function (error) {
                $scope.error = true,
                    $scope.message = error.data.message
            });
    }

    $scope.getProductsBySupplier = function () {
        productService.getProductsBySeller($scope.sellers._id)
            .then(function (result) {
                if (result.data.success) {
                    $scope.products = result.data.products;
                }
                else {
                    $scope.error = true,
                        $scope.message = result.data.message;
                }
            })
            .catch(function (error) {
                $scope.error = true,
                    $scope.message = error.data.message
            });
    }

    $scope.editProduct = function (product) {
        $scope.Editproduct = product;
        var catIndex = $scope.categories.findIndex(x => x.name == product.category.name);
        var sellerIndex = $scope.sellers.findIndex(x => x.username == product.seller.username);
        $scope.Editproduct.category = $scope.categories[catIndex];
        $scope.Editproduct.seller = $scope.sellers[sellerIndex];
        $scope.action = "Edit Product";
    }

    $scope.deleteProduct = function (productid) {
        productService.deleteProduct(productid)
            .then(function (result) {
                if (result.data.success) {
                    $scope.success = true;
                    $scope.message = result.data.message;
                    $scope.initialize();
                }
                else {
                    $scope.error = true,
                        $scope.message = result.data.message;
                }
            })
            .catch(function (error) {
                $scope.error = true,
                    $scope.message = error.data.message
            });
    }

    $scope.initialize = function () {
        $scope.getCategories();
        $scope.getSuppliers();
        $scope.action = "Add Product";
        $scope.getProducts();
        $scope.Editproduct = {
            category: {}, seller: {}
        }
    }
}
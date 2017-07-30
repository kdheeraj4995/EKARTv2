app.controller('productController', productController);
function productController(productService, $scope, $routeParams) {
    
    $scope.getProductsByCategory = function () {
        var categoryid = $routeParams.categoryid;
        productService.getProductsByCategory(categoryid)
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

    $scope.getProduct = function () {
        var productid = $routeParams.productid;
        productService.getProduct(productid)
            .then(function (result) {
                if (result.data.success) {
                    $scope.product = result.data.product;
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
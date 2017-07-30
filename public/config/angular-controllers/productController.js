app.controller('productController', productController);
function productController(productService, $scope, $routeParams) {
    var categoryid = $routeParams.categoryid;
    var productid = $routeParams.productid;
    if (categoryid) {
        console.log(categoryid);
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
    if (productid) {
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
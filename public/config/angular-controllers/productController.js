app.controller('productController', productController);
function productController(productService, $scope,$routeParams) {
    var categoryid = $routeParams.categoryid;
    console.log(categoryid);
    productService.getProductsByCategory(categoryid)
        .then(function (result) {
            $scope.products = result.data;
        })
        .catch(function (error) {
            $scope.products = {}
        });
}
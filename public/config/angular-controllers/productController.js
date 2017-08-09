app.controller('productController', productController);
function productController(productService, $scope, $routeParams, $window, $rootScope) {

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

    $scope.AddToCart = function (product) {
        var exist;
        if ($window.localStorage.cart == undefined) {
            console.log("Empty Cart")
            var data = [];
            data.push(product);
        }
        else {
            console.log("Not Empty Cart")
            data = JSON.parse($window.localStorage.cart);
            console.log(data);
            exist = data.findIndex(x => x._id === product._id);
            console.log(exist)
            if (exist > -1) {
                console.log("Already Existing Product")
                if ((data[exist].req + product.req) > product.quantity) {
                    alert("Limit Exceeded");
                    return
                }
                else{
                    data[exist].req +=product.req;
                }
            }
            else{
                console.log("New Element")
                data.push(product);
            }
        }
        $window.localStorage.cart = JSON.stringify(data);
        $rootScope.$emit("CartUpdated");
    }
}

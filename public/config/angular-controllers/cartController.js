app.controller('cartController', cartController);
function cartController($scope, $window, $rootScope, $route,$http) {

    $scope.cost = 0;

    $rootScope.$on("CartUpdated", function () {
        $scope.cartStart();
    });

    $scope.Payment = function(cart){
        console.log("Hello")
        $http({
            method: 'POST',
            url: '/api/cart',
            data: cart
        })
    }

    $scope.UpdateCart = function (product) {
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
                else {
                    data[exist].req = product.req;
                }
            }
            else {
                console.log("New Element")
                data.push(product);
            }
        }
        $window.localStorage.cart = JSON.stringify(data);
        $rootScope.$emit("CartUpdated");
        $route.reload();
    }

    $scope.DeleteItem = function (product) {
        var exist;
        if ($window.localStorage.cart == undefined) {
            console.log("Empty Cart")
            var data = [];
        }
        else {
            data = JSON.parse($window.localStorage.cart);
            exist = data.findIndex(x => x._id === product._id);
            if (exist > -1) {
                data.splice(exist, 1);
                $window.localStorage.cart = JSON.stringify(data);
                $rootScope.$emit("CartUpdated");
                $route.reload();
            }
        }
    }

    $scope.cartStart = function () {
        if ($window.localStorage.cart == undefined) {
            $scope.cartSize = 0;
        }
        else {
            $scope.cart = JSON.parse($window.localStorage.cart);
            $scope.cart.forEach(function (element) {
                delete element.$$hashKey;
            });
            $scope.cartSize = $scope.cart.length;
            $scope.TotalPrice($scope.cart);
        }
    }

    $scope.TotalPrice = function (cart) {
        cart.forEach(function (element) {
            $scope.cost += element.price * element.req;
        })
    }

    $scope.cartStart();

}
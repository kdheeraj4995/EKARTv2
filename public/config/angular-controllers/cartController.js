app.controller('cartController', cartController);
function cartController($scope, $window, $rootScope) {


    $rootScope.$on("CartUpdated", function () {
        $scope.cartStart();
    });

    $scope.cartStart = function () {
        if ($window.localStorage.cart == undefined) {
            $scope.cartSize = 0;
        }
        else {
            $scope.cart = JSON.parse($window.localStorage.cart);
            $scope.cart.forEach(function(element) {
                delete element.$$hashKey;
            });
            $scope.cartSize = $scope.cart.length;
        }
    }

    $scope.cartStart();
}
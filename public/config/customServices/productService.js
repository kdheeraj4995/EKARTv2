app.service('productService', function ($http) {
    this.getProducts = function () {
        return $http({
            method: 'GET',
            url: '/api/product'
        })
    }

    this.addProduct = function (product) {
        return $http({
            method: 'POST',
            url: '/api/product',
            data: product
        })
    }
})

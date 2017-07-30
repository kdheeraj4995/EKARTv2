app.service('productService', function ($http) {
    this.getProducts = function () {
        return $http({
            method: 'GET',
            url: '/api/product'
        })
    }

    this.getProduct = function (productid) {
        return $http({
            method: 'GET',
            url: '/api/product/'+productid
        })
    }

    this.addProduct = function (product) {
        return $http({
            method: 'POST',
            url: '/api/product',
            data: product
        })
    }

    this.getProductsByCategory = function(categoryid){
         return $http({
            method: 'GET',
            url: '/api/product/category/'+categoryid
        })
    }
})

app.service('productService', function ($http) {

    this.uploadFile = function (file,name) {
        var fd = new FormData();
        fd.append(name, file);
        return $http({
            method: 'POST',
            url: '/api/product/image',
            data: fd,
            transformRequest: angular.identity,
            headers: {
                'Content-Type': undefined
            }
        })
    }

    this.getProducts = function () {
        return $http({
            method: 'GET',
            url: '/api/product'
        })
    }

    this.getProductsBySeller = function (sellerId) {
        return $http({
            method: 'GET',
            url: '/api/product?seller=' + sellerId
        })
    }

    this.getProduct = function (productid) {
        return $http({
            method: 'GET',
            url: '/api/product/' + productid
        })
    }

    this.addProduct = function (product) {
        return $http({
            method: 'POST',
            url: '/api/product',
            data: product
        })
    }

    this.editProduct = function (product) {
        return $http({
            method: 'POST',
            url: '/api/product/' + product._id,
            data: product
        })
    }

    this.getProductsByCategory = function (categoryid) {
        return $http({
            method: 'GET',
            url: '/api/product/category/' + categoryid
        })
    }

    this.deleteProduct = function (productid) {
        return $http({
            method: 'DELETE',
            url: '/api/product/' + productid
        })
    }
})

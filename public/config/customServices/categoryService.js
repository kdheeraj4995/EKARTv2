app.service('categoryService', function ($http) {
    this.getCategories = function () {
        return $http({
            method: 'GET',
            url: '/api/category'
        })
    }

    this.addCategory = function (category) {
        return $http({
            method: 'POST',
            url: '/api/category',
            data: category
        })
    }
})

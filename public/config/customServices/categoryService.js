app.service('categoryService', function ($http) {

    this.addCategory = function (category) {
        return $http({
            method: 'POST',
            url: '/api/category',
            data: category
        })
    }

    this.getCategories = function () {
        return $http({
            method: 'GET',
            url: '/api/category'
        })
    }

    this.getCategory = function (categoryid) {
        return $http({
            method: 'GET',
            url: '/api/category/' + categoryid
        })
    }

    this.deleteCategory = function (categoryid) {
        return $http({
            method: 'DELETE',
            url: '/api/category/' + categoryid
        })
    }
})

app.controller('categoryController', categoryController);
function categoryController(categoryService, $scope) {
    categoryService.getCategories()
        .then(function (result) {
            $scope.categories = result.data;
        })
        .catch(function (error) {
            $scope.categories = {}
        });
}
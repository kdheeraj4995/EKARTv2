app.controller('admincategoryController', admincategoryController);
function admincategoryController(categoryService, $scope, $route) {
    $scope.action = "Add Category";

    $scope.addCategory = function () {
        categoryService.addCategory($scope.Editcategory)
            .then(function (result) {
                if (result.data.success) {
                    $scope.success = true
                    $scope.message = result.data.message;
                    $scope.getCategories();
                    $scope.Editcategory = {};
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

    $scope.getCategories = function () {
        categoryService.getCategories()
            .then(function (result) {
                if (result.data.success) {
                    $scope.categories = result.data.categories;
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

    $scope.getCategory = function () {
        var categoryid = $routeParams.categoryid;
        categoryService.getCategory(categoryid)
            .then(function (result) {
                if (result.data.success) {
                    $scope.category = result.data.category;
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

    $scope.deleteCategory = function (categoryid) {
        categoryService.deleteCategory(categoryid)
            .then(function (result) {
                if (result.data.success) {
                    console.log("In controller 1")
                    $scope.success = true;
                    $scope.message = result.data.message;
                    $scope.getCategories();
                }
                else {
                    console.log("In controller 2")
                    $scope.error = true,
                    $scope.message = result.data.message;
                }
            })
            .catch(function (error) {
                console.log("In controller 3")
                $scope.error = true,
                $scope.message = error.data.message
            });
    }

    $scope.editCategory = function (category) {
        $scope.action = "Edit Category";
        $scope.Editcategory = category;

    }

    $scope.reset = function () {
        $scope.Editcategory = {};
        $scope.action = "Add Category";
        //$route.reload();
    }

}
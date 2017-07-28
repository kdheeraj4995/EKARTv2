app.controller('LoginController', LoginController);

function LoginController($http, $location, $window, jwtHelper, $route) {
    var vm = this;
    vm.login = function () {
        var user = {
            username: vm.username,
            password: vm.password
        };
        if (!vm.username) {
            vm.error = 'Username should not be empty';
        }
        else if (!vm.password) {
            vm.error = 'Password should not be empty';
        }
        else {
            $http.post('/api/users/login', user).then(function (response) {
                if (response.data.success) {
                    $window.sessionStorage.token = response.data.token;
                    var decodedToken = jwtHelper.decodeToken(response.data.token);
                    $window.sessionStorage.role = decodedToken.role;
                    $location.path('/');
                }
                else {
                    vm.error = response.data.message;
                    vm.password = '';
                }
            }).catch(function (error) {
                vm.error = error.data.message;
                vm.password = '';
            })
        }
    }
    vm.logout = function () {
        delete $window.sessionStorage.token;
        delete $window.sessionStorage.role;
        $location.path('/');
        $route.reload();
    }

    vm.homepage = function () {
        $location.path('/');
    }
}
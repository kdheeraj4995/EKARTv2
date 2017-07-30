app.controller('userController', userController);

function userController(userService, $location, $window, jwtHelper, $route) {
    
    var vm = this;

    vm.register = function () {
        var user = {
            name: vm.name,
            username: vm.username,
            password: vm.password
        };
        if (!vm.name) {
            vm.error = 'Name should not be empty';
        }
        else if (!vm.username) {
            vm.error = 'Usernameshould not be empty';
        }
        else if (!vm.password) {
            vm.error = 'Password should not be empty';
        }
        else if (vm.password !== vm.passwordRepeat) {
            vm.error = 'Please make sure the passwords match.';
        }
        else {
            userService.register(user)
                .then(function (result) {
                    vm.message = 'Successful registration, please login.';
                    vm.error = '';
                    vm.name = '';
                    vm.username = '';
                    vm.password = '';
                    vm.passwordRepeat = '';
                })
                .catch(function (error) {
                    vm.error = error.data.message;
                });
        }
    }

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
            userService.login(user)
                .then(function (response) {
                    if (response.data.success) {
                        $window.sessionStorage.token = response.data.token;
                        var decodedToken = jwtHelper.decodeToken(response.data.token);
                        $window.sessionStorage.role = decodedToken.role;
                        $location.path('/');
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

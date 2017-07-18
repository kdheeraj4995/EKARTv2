app.controller('RegisterController', RegisterController);

function RegisterController($http) {
    var vm = this;
    vm.register = function () {
        var user = {
            name: vm.name,
            username: vm.username,
            password: vm.password
        };
        if (!vm.username || !vm.password || !vm.name) {
            vm.error = 'Username and Password should not be empty';
        } else {
            if (vm.password !== vm.passwordRepeat) {
                vm.error = 'Please make sure the passwords match.';
            } else {
                $http.post('/api/users/register', user).then(function (result) {
                    console.log(result);
                    vm.message = 'Successful registration, please login.';
                    vm.error = '';
                    vm.name = '';
                    vm.username = '';
                    vm.password = '';
                    vm.passwordRepeat = '';
                }).catch(function (error) {
                    vm.error = error.data.message;
                    console.log(error);
                });
            }
        }
    }
}


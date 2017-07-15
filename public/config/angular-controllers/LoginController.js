app.controller('LoginController', LoginController);

function LoginController($http, $location, $window) {
    var vm = this;
    vm.login = function () {
        var user = {
            username: vm.username,
            password: vm.password
        };

        $http.post('/api/users/login', user).then(function (response) {
            console.log(response.data.success);
            console.log(response.data.message);
            if (response.data.success) {
                $window.sessionStorage.token = response.data.token;
                var token = $window.sessionStorage.token;
                console.log(token)
            }
            else{
                vm.error = response.data.message;
            }
        }).catch(function (error) {
            vm.error = error.data.message;
        })
    }
}
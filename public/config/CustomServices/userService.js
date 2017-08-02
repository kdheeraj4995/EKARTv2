app.service('userService', function ($http) {
    this.register = function (user) {
        return $http({
            method: 'POST',
            url: '/api/users',
            data: user
        })
    }

    this.login = function (user) {
        return $http({
            method: 'POST',
            url: '/api/users/login',
            data: user
        })
    }

    this.getUsers = function () {
        return $http({
            method: 'GET',
            url: '/api/users'
        })
    }

    this.getUsersByRole = function (role) {
        return $http({
            method: 'GET',
            url: '/api/users' + "?role="+ role
        })
    }
})


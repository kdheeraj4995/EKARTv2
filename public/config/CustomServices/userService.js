app.service('userService', function ($http) {
    this.register = function (user) {
        return $http({
            method: 'POST',
            url: '/api/users/register',
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
    
})


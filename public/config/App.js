var app = angular.module("myApp", ["ngRoute", "angular-jwt"]);

app.config(['$routeProvider','$locationProvider', function ($routeProvider,$locationProvider) {
	$routeProvider
		.when('/Login', {
			templateUrl: 'views/login.html',
			controller: 'userController',
			controllerAs: 'vm',
			access: {
				restricted: false
			}
		}).when('/Register', {
			templateUrl: 'views/registration.html',
			controller: 'userController',
			controllerAs: 'vm',
			access: {
				restricted: false
			}
		}).when('/product/:category', {
			templateUrl: 'views/products.html',
			access: {
				restricted: false
			}
		}).when('/Admin', {
			templateUrl: 'views/admin.html',
			access: {
				restricted: true,
				role: "Admin"
			}
		}).when('/Forbidden', {
			templateUrl: 'views/forbidden.html',
			access: {
				restricted: false
			}
		}).otherwise({
			templateUrl: 'views/corousel.html',
			access: {
				restricted: false
			}
		});
		$locationProvider.html5Mode(true);
}]);


app.run(run);
function run($rootScope, $location, $window) {
	$rootScope.$on('$routeChangeStart', function (event, nextRoute, currentRoute) {
		$rootScope.loggedIn = ($window.sessionStorage.token) ? true : false;
		$rootScope.access = $window.sessionStorage.role;
		var Basic = ['/Login', '/Register'];
		if (($rootScope.loggedIn) && (Basic.indexOf($location.path()) !== -1)) {
			$location.path('/');
		}
		else 
		{
			if (nextRoute.access !== undefined && nextRoute.access.restricted) {
				if ($rootScope.loggedIn) {
					if ($rootScope.access !== nextRoute.access.role) {
						$location.path('/Forbidden');
					}
				}
				else {
					event.preventDefault();
					$location.path('/Login');
				}
			}
		}
	});
}


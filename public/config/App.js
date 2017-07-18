var app = angular.module("myApp", ["ngRoute", "angular-jwt"]);

app.config(['$routeProvider', function ($routeProvider) {
	$routeProvider.when('/Login', {
		templateUrl: 'views/login.html',
		controller: 'LoginController',
		controllerAs: 'vm',
		access: {
			restricted: false
		}
	}).when('/Registration', {
		templateUrl: 'views/registration.html',
		controller: 'RegisterController',
		controllerAs: 'vm',
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
}]);

app.run(run);
function run($rootScope, $location, $window, $log, AuthFactory) {
	$rootScope.$on('$routeChangeStart', function (event, nextRoute, currentRoute) {

	
		$rootScope.loggedIn = ($window.sessionStorage.token) ? true : false;
		$rootScope.access = $window.sessionStorage.user;
		console.log($rootScope.loggedIn);
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
	});
}


var app = angular.module("myApp", [ "ngRoute"]);

app.config([ '$routeProvider', function($routeProvider) {
	$routeProvider .when('/Login', {
		templateUrl : 'views/login.html',
		controller : 'LoginController',
		controllerAs: 'vm'
	}).when('/Registration', {
		templateUrl : 'views/registration.html',
		controller : 'RegisterController',
		controllerAs: 'vm'
	})  .otherwise({
		templateUrl : 'views/corousel.html'
	}); 
}]);
var app = angular.module("myApp", [ "ngRoute"]);

app.config([ '$routeProvider', function($routeProvider) {
	$routeProvider .when('/Login', {
		templateUrl : 'views/login.html',
		controller : 'UserController',
	}).when('/Registration', {
		templateUrl : 'views/registration.html',
		controller : 'UserController',
		controllerAs: 'vm'
	})  .otherwise({
		templateUrl : 'views/corousel.html'
	}); 
}]);
var app = angular.module("myApp", ["ngRoute", "angular-jwt"]);

app.config(['$routeProvider', '$locationProvider', '$httpProvider', function ($routeProvider, $locationProvider, $httpProvider) {
	$httpProvider.interceptors.push('AuthInterceptor');
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
		}).when('/Supplier', {
			templateUrl: 'views/supplier.html',
			controller: supplierproductController,
			access: {
				restricted: true,
				role: "Supplier"
			}
		}).when('/product/category/:categoryid', {
			templateUrl: 'views/products.html',
			controller: productController,
			access: {
				restricted: false
			}
		}).when('/product/:productid', {
			templateUrl: 'views/singleproduct.html',
			controller: productController,
			access: {
				restricted: false
			}
		}).when('/Admin/category', {
			templateUrl: 'views/adminCategory.html',
			controller: admincategoryController,
			access: {
				restricted: true,
				role: "Admin"
			}
		}).when('/Admin/product', {
			templateUrl: 'views/adminProduct.html',
			controller: adminproductController,
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
		if ($rootScope.loggedIn) {
			$rootScope.isAdmin = ($window.sessionStorage.role.indexOf("Admin") !== -1) ? true : false;
			$rootScope.isSupplier = ($window.sessionStorage.role.indexOf("Supplier") !== -1) ? true : false;
		}
		var Basic = ['/Login', '/Register'];
		if (($rootScope.loggedIn) && (Basic.indexOf($location.path()) !== -1)) {
			$location.path('/');
		}
		else {
			if (nextRoute.access !== undefined && nextRoute.access.restricted) {
				if ($rootScope.loggedIn) {
					if ($rootScope.access.indexOf(nextRoute.access.role) == -1) {
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


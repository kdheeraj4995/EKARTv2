app.factory('AuthInterceptor', AuthInterceptor);

function AuthInterceptor($location, $q, $window) {
  return {
    request: request,
    responseError: responseError 
  };

  function request(config) {
    config.headers = config.headers || {};
    if ($window.sessionStorage.token) {
      config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
    }
    return config;
  }
  function responseError(rejection) {
    if (rejection.status === 401) {
      delete $window.sessionStorage.token;
      delete $window.sessionStorage.user;
      $location.path('/Login');
    }
     if (rejection.status === 403) {
      delete $window.sessionStorage.token;
      delete $window.sessionStorage.user;
      $location.path('/Forbidden');
    }
    return $q.reject(rejection);
  } 
}
 
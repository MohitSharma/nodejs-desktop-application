var app = angular.module('timeTracking', ['ngRoute', 'ngSanitize', 'ngAnimate', 'ngTouch', 'ui.bootstrap']);

app.factory('CacheProvider', function ($cacheFactory) {
    return $cacheFactory('TimeTrackingCache');
});

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'views/login.html',
            controller: 'LoginController'
        })
        .when('/home', {
            templateUrl: 'views/home.html',
            controller: 'HomeController'
        })
        .when('/users', {
            templateUrl: 'users.html',
            controller: 'UsersController',
            resolve : {
                currentAuth: function(Authentication) {
                    return Authentication.requireAuth();
                }
            }
        });
}]);

app.filter('unsafe', function ($sce) {
    return function (val) {
        return $sce.trustAsHtml(val);
    };
});

// angular's breaking error
app.factory('$exceptionHandler', function () {
    return function (exception, cause) {
        console.log(exception);
        console.log(cause);
    };
});
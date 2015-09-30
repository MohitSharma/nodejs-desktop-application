app.controller('LoginController', function($scope, $http, $location) {
    $scope.user = {email: "mohits@swiftsetup.com", password: "mohit123"};
    $scope.login = function() {
        console.log("Working");
        $location.path('home');
    };
});
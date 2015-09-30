app.controller('AddUserController', function($scope, $modalInstance, UserManager, users) {
    $scope.user = {};
    $scope.roles = [{label: 'Admin', key: 1}, {label: 'Project Manager', key: 2}, {label: 'Developer', key: 3}, {label: 'Tester', key: 4}];
    $scope.addUser = function() {
        UserManager.newUser($scope.user);
        $scope.user = {};
        $modalInstance.dismiss('cancel');
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
});
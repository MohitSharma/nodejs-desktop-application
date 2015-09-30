app.controller('AddProjectController', function($scope, $modalInstance, ProjectManager, projects) {
    $scope.project = {};

    $scope.statuses = [{label: 'Active', key: 1}, {label: 'In Active', key: 2}, {label: 'Completed', key: 3}];

    $scope.addProject = function() {
        ProjectManager.newProject($scope.project);
        $scope.project = {};
        $modalInstance.dismiss('cancel');
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
});
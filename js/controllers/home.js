
app.controller('HomeController', function($scope, $http, $location, $routeParams, $interval, $timeout, $modal, TaskManager, UserManager, ProjectManager) {
    //User Management
    $scope.users = [];

    UserManager.loadUsers();

    $scope.deleteUser = function(userId) {
        if (confirm("Are you sure to delele user?")) {
            UserManager.remove(userId);
        }
    };

    function refreshUsers() {
        $scope.users = UserManager.users;
    }



    $scope.addUser = function () {
        var modalInstance = $modal.open({
            animation: true,
            templateUrl: 'views/admin/user/add.html',
            controller: 'AddUserController',
            size: 'md',
            resolve: {
                users: function () {
                    return $scope.users;
                }
            }
        });
    };



    $interval(refreshUsers, 1000);



    //Project Management

    $scope.projects = [];

    ProjectManager.loadProjects();


    $scope.deleteProject = function(projectId) {
        if (confirm("Are you sure to delele project?")) {
            ProjectManager.remove(projectId);
        }
    };

    function refreshProjects() {
        $scope.projects = ProjectManager.projects;
    }

    $scope.addProject = function () {
        var modalInstance = $modal.open({
            animation: true,
            templateUrl: 'views/admin/project/add.html',
            controller: 'AddProjectController',
            size: 'md',
            resolve: {
                projects: function () {
                    return $scope.projects;
                }
            }
        });
    };

    $interval(refreshProjects, 1000);




    //Task Management
    $('#new-task').keypress(function(e) {
        if (e.keyCode == 13) {
            $scope.newTask();
        }
    });

    $scope.newTask = function() {
        var taskName = $('#new-task').val().trim();
        if (taskName == '') return;

        TaskManager.newTask(taskName);
        $('#new-task').val('');
        $('#new-task').focus();
        refreshTasks();
    };

    $scope.toggleTaskStatus = function(taskId) {
        var task = TaskManager.get(taskId);
        if (task.running) task.pause();
        else task.start();
        refreshTasks();
    };

    $scope.markAsDone = function(taskId) {
        var task = TaskManager.get(taskId);
        task.markAsDone();
        refreshTasks();
    };

    $scope.removeTask = function(taskId) {
        TaskManager.remove(taskId);
        refreshTasks();
    };

    function initWindow() {
        $(document).delegate('.running-tasks-container .running-task', 'mouseover', function() {
            $(this).find('.mark-as-done').removeClass('hidden');
        })
        $(document).delegate('.running-tasks-container .running-task', 'mouseout', function() {
            $(this).find('.mark-as-done').addClass('hidden');
        });
        $(document).delegate('.done-tasks-container .done-task', 'mouseover', function() {
            $(this).find('.remove-task').removeClass('hidden');
        });
        $(document).delegate('.done-tasks-container .done-task', 'mouseout', function() {
            $(this).find('.remove-task').addClass('hidden');
        });
    }

    function refreshTasks() {
        var runningTasks = [];
        var doneTasks = [];
        TaskManager.tasks.forEach(function(task) {
            if (task.done)
                doneTasks.push(task);
            else
                runningTasks.push(task);
        });
        $scope.RunningTasks = runningTasks;
        $scope.DoneTasks = doneTasks;
    }

    TaskManager.loadTasks();
    $interval(refreshTasks, 1000);
    $timeout(initWindow);

});
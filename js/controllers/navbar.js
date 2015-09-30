app.controller('NavController', function($scope, $http, $location, TaskManager, Settings) {
    var nw = require('nw.gui');
    var win = nw.Window.get();
    $scope.Settings = Settings.get();

    win.on('close', function() {
        if ($scope.Settings.stopTasksOnClose) {
            TaskManager.tasks.forEach(function(task) {
                task.pause();
            });
        }
        TaskManager.saveTasks();
        this.close();
    });

    $scope.minimizeWindow = function() {
        win.minimize();
    };
    $scope.closeWindow = function() {
        win.close();
    };

    $scope.openSettings = function() {
        var settings = Settings.get();
        $('#always-on-top').prop('checked', settings.alwaysOnTop);
        $('#hide-seconds').prop('checked', settings.hideSeconds);
        $('#stop-tasks-on-close').prop('checked', settings.stopTasksOnClose);
        $('#run-task-immediately').prop('checked', settings.startRunningImmediately);
        $('#hide-done').prop('checked', settings.hideDoneTasks);

        $('.backdrop').removeClass('hidden');
        $('.settings-window-container').removeClass('hidden');
    };

    $scope.closeSettings = function() {
        $('.backdrop').addClass('hidden');
        $('.settings-window-container').addClass('hidden');
    };
    $scope.saveSettings = function() {
        var settings = Settings.get();
        settings.alwaysOnTop = $('#always-on-top').is(':checked');
        settings.hideSeconds = $('#hide-seconds').is(':checked');
        settings.stopTasksOnClose = $('#stop-tasks-on-close').is(':checked');
        settings.startRunningImmediately = $('#run-task-immediately').is(':checked');
        settings.hideDoneTasks = $('#hide-done').is(':checked');
        Settings.saveSettings();
        Settings.applySettings(win);

        $scope.Settings = Settings.get();
        $scope.closeSettings();
    };

    Settings.applySettings(win);
});
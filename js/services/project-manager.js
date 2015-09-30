app.factory('ProjectManager', ['$http', '$q', 'Settings', function($http, $q) {
    var fs = require('fs');
    var projectManager = {
        projects: [],
        newProject: function(project) {
            var t = new Project(project);
            this.projects.push(t);
            this.saveProjects();
        },

        get: function(projectId) {
            for (var i=0; i<this.projects.length; i++) {
                if (this.projects[i].id == projectId) return this.projects[i];
            }
        },

        loadProjects: function() {
            var buffer;
            try {
                buffer = fs.readFileSync('./projects.json');
            }
            catch (e) {
                if (fs.existsSync('./projects.json')) {
                    console.log("File Already Exists");
                }
                buffer = new Buffer('[]');
            }
            var fileProjects = JSON.parse(buffer.toString());
            var projects = this.projects;
            fileProjects.forEach(function(project) {
                projects.push(new Project(project).fromJson(project));
            });
            this.projects = projects;
        },
        saveProjects: function() {
            var buffer = new Buffer(JSON.stringify(this.projects));
            var fd = fs.openSync('./projects.json', 'w+');
            fs.writeSync(fd, buffer, 0, buffer.length, 0);
        },
        remove: function(projectId) {
            for (var i=0; i<this.projects.length; i++) {
                if (this.projects[i].id === projectId)
                    this.projects.splice(i, 1);
            }
            this.saveProjects();
        }
    };

    return projectManager;

}]);
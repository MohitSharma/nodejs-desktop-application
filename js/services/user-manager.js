app.factory('UserManager', ['$http', '$q', 'Settings', function($http, $q) {
    var fs = require('fs');
    var userManager = {
        users: [],
        newUser: function(user) {
            var t = new User(user);
            this.users.push(t);
            this.saveUsers();
        },

        get: function(userId) {
            for (var i=0; i<this.users.length; i++) {
                if (this.users[i].id == userId) return this.users[i];
            }
        },

        loadUsers: function() {
            var buffer;
            try {
                buffer = fs.readFileSync('./users.json');
            }
            catch (e) {
                if (fs.existsSync('./users.json')) {
                    console.log("File Already Exists");
                }
                buffer = new Buffer('[]');
            }
            var fileUsers = JSON.parse(buffer.toString());
            var users = this.users;
            fileUsers.forEach(function(user) {
                users.push(new User(user).fromJson(user));
            });
            this.users = users;
        },
        saveUsers: function() {
            var buffer = new Buffer(JSON.stringify(this.users));
            var fd = fs.openSync('./users.json', 'w+');
            fs.writeSync(fd, buffer, 0, buffer.length, 0);
        },
        remove: function(userId) {
            for (var i=0; i<this.users.length; i++) {
                if (this.users[i].id === userId)
                    this.users.splice(i, 1);
            }
            this.saveUsers();
        }
    }

    return userManager;

}]);
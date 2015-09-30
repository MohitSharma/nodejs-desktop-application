app.factory('Authentication', function( $location, $rootScope) {
    var authObj = {};
    authObj.onAuth(function(authUser) {
        if (authUser) {
            $rootScope.currentUser = user;
        } else {
            $rootScope.currentUser = '';
        }
    });

    var myObject = {
        login: function(user) {
            return authObj.authWithPassword({
                email: user.email,
                password: user.password
            });
        },
        status: function(callback) {
            return authObj.onAuth(callback);
        },
        logout: function() {
            return authObj.unauth();
        },
        register: function(user) {
            return authObj.createUser({email: user.email, password: user.password}).then(function(regUser) {

            });
        },
        requireAuth: function() {
            return authObj.requireAuth();
        },
        waitForAuth: function() {
            return authObj.waitForAuth();
        }
    };

    $rootScope.signedIn = function() {
        return myObject.signedIn();
    }

    return myObject;
});
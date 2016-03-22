(function() {
    "use strict";
    angular
        .module('XPTrackerApp')
        .factory("UserService", UserService);

    function UserService($http) {

        var factory = {};

        factory.findUserByUsernameAndPassword = function(username, password) {
            return $http.get("/api/project/user?username=" + username + "&password=" + password);
        };

        factory.findUserByUsername = function(username) {
            return $http.get("/api/project/user?username=" + username);
        };

        factory.findAllUsers = function() {
            return $http.get("/api/project/user");
        };

        factory.createUser = function(user) {
            return $http.post("/api/project/user", user);
        };

        factory.deleteUserById = function(userId) {
            return $http.delete("/api/project/user/" + userId);
        };

        factory.updateUser = function(userId, user) {
            return $http.put("/api/project/user/" + userId, user);
        };

        return factory;
    }
})();


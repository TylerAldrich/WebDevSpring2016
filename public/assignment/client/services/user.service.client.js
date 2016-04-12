(function() {
    "use strict";
    angular
        .module('FormBuilderApp')
        .factory("UserService", UserService);

    function UserService($http) {

        var factory = {};

        factory.findUserByUsernameAndPassword = function(username, password) {
            return $http.get("/api/assignment/user?username=" + username + "&password=" + password);
        };

        factory.findUserByUsername = function(username) {
            return $http.get("/api/assignment/user?username=" + username);
        };

        factory.findAllUsers = function() {
            return $http.get("/api/assignment/admin/user");
        };

        factory.createUser = function(user) {
            return $http.post("/api/assignment/admin/user", user);
        };

        factory.deleteUserById = function(userId) {
            return $http.delete("/api/assignment/admin/user/" + userId);
        };

        factory.updateUserAdmin = function(userId, user) {
            return $http.put("/api/assignment/admin/user/" + userId, user);
        };

        factory.updateUser = function(userId, user) {
            return $http.put("/api/assignment/user/" + userId, user);
        };

        factory.login = function(username, password) {
            return $http.post("/api/assignment/login", {
                username: username,
                password: password
            });
        };

        factory.logout = function() {
            return $http.post("/api/assignment/logout");
        };

        factory.register = function(user) {
            return $http.post("/api/assignment/user", user);
        };

        return factory;
    }
})();


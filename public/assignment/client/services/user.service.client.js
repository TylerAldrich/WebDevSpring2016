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
            return $http.get("/api/assignment/user");
        };

        factory.createUser = function(user) {
            return $http.post("/api/assignment/user", user);
        };

        factory.deleteUserById = function(userId) {
            return $http.delete("/api/assignment/user/" + userId);
        };

        factory.updateUser = function(userId, user) {
            return $http.put("/api/assignment/user/" + userId, user);
        };

        return factory;
    }
})();


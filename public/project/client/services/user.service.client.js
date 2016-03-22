(function() {
    "use strict";
    angular
        .module('XPTrackerApp')
        .factory("UserService", UserService);

    function UserService($http) {

        var factory = {
            findUserByUsernameAndPassword: findUserByUsernameAndPassword,
            findUserByUsername: findUserByUsername,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser
        };
        return factory;

        function findUserByUsernameAndPassword(username, password) {
            return $http.get("/api/project/user?username=" + username + "&password=" + password);
        }

        function findUserByUsername(username) {
            return $http.get("/api/project/user?username=" + username);
        }

        function findAllUsers() {
            return $http.get("/api/project/user");
        }

        function createUser(user) {
            return $http.post("/api/project/user", user);
        }

        function deleteUserById(userId) {
            return $http.delete("/api/project/user/" + userId);
        }

        function updateUser(userId, user) {
            return $http.put("/api/project/user/" + userId, user);
        }
    }
})();


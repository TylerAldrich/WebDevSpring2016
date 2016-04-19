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
            updateUser: updateUser,
            register: register,
            login: login,
            logout: logout,
            updateUserAdmin: updateUserAdmin
        };
        return factory;

        function login(username, password) {
            return $http.post("/api/project/login", {username: username, password: password});
        }

        function logout() {
            return $http.post("/api/project/logout");
        }

        function findUserByUsernameAndPassword(username, password) {
            return $http.get("/api/project/user?username=" + username + "&password=" + password);
        }

        function findUserByUsername(username) {
            return $http.get("/api/project/user?username=" + username);
        }

        function findAllUsers() {
            return $http.get("/api/project/admin/user");
        }

        function createUser(user) {
            return $http.post("/api/project/user", user);
        }

        function deleteUserById(userId) {
            return $http.delete("/api/project/admin/user/" + userId);
        }

        function updateUser(userId, user) {
            return $http.put("/api/project/user/" + userId, user);
        }

        function updateUserAdmin(userId, user) {
            return $http.put("/api/project/admin/user/" + userId, user);
        }

        function register(user) {
            return $http.post("/api/project/register", user);
        }
    }
})();


(function() {
    "use strict";
    angular
        .module('XPTrackerApp')
        .controller("AdminController", AdminController);

    function AdminController($scope, UserService) {
        $scope.users = [];
        $scope.currentSelection = null;
        populateUsers();

        function populateUsers() {
            UserService.findAllUsers().then(
                function(res) {
                    $scope.users = res.data;
                }
            )
        }

        $scope.addUser = function() {
            var user = {
                username: $scope.username,
                password: $scope.password,
                isAdmin: $scope.isAdmin
            };
            if ($scope.rsAccounts) user.rsAccounts = $scope.rsAccounts.split(",");
            if ($scope.clans) user.clans = $scope.clans.split(",");

            UserService.createUser(user).then(
                function(res) {
                    $scope.users.push(res.data);
                }
            )
        };

        $scope.updateUser = function() {
            if ($scope.currentSelection === null) return;

            var user =  $scope.users[$scope.currentSelection];
            user.username = $scope.username;
            user.password = $scope.password;
            if ($scope.rsAccounts) user.rsAccounts = $scope.rsAccounts.split(",");
            if ($scope.clans) user.clans = $scope.clans.split(",");
            user.isAdmin = $scope.isAdmin;

            UserService.updateUserAdmin(user._id, user).then(
                function() {
                    populateUsers();
                }
            )
        };

        $scope.deleteUser = function(idx) {
            UserService.deleteUserById($scope.users[idx]._id).then(
                function() {
                    populateUsers();
                }
            )
        };

        $scope.selectUser = function(idx) {
            $scope.currentSelection = idx;
            $scope.username = $scope.users[idx].username;
            $scope.password = $scope.users[idx].password;
            $scope.rsAccounts = $scope.users[idx].rsAccounts.join();
            $scope.clans = $scope.users[idx].clans.join();
            $scope.isAdmin = $scope.users[idx].isAdmin;
        };
    }
})();

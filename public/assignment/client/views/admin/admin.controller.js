(function() {
    "use strict";
    angular
        .module('FormBuilderApp')
        .controller("AdminController", AdminController);

    function AdminController($scope, UserService) {
        populateAndSortUsers();
        $scope.currentSelection = null;
        $scope.sortAsc = true;
        $scope.sortField = "username";

        function populateAndSortUsers() {
            UserService.findAllUsers().then(
                function(res) {
                    var users = res.data;

                    users.sort(function(a, b) {
                        var compVal;
                        if (a[$scope.sortField] < b[$scope.sortField]) {
                            compVal = -1;
                        }
                        else if (a[$scope.sortField] > b[$scope.sortField]) {
                            compVal = 1;
                        } else {
                            compVal = 0;
                        }

                        if (!$scope.sortAsc) {
                            compVal *= -1;
                        }
                        return compVal;
                    });

                    $scope.users = users;
                }
            );
        }

        $scope.sortBy = function(field) {
            console.log("Sorting by " + field);
            if (field === $scope.sortField) {
                // just need to flip sort order
                $scope.sortAsc = !$scope.sortAsc;
            } else {
                $scope.sortField = field;
                $scope.sortAsc = true;
            }

            populateAndSortUsers();
        };

        $scope.getRoles = function(user) {
            return user.roles.join();
        };

        $scope.addUser = function() {
            var user = {
                username: $scope.username,
                password: $scope.password,
                firstName: $scope.firstName,
                lastName: $scope.lastName,
                roles: $scope.rolesString.split(",")
            };

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
            user.firstName = $scope.firstName;
            user.lastName = $scope.lastName;
            user.roles = $scope.rolesString.split(",");

            UserService.updateUserAdmin(user._id, user).then(
                function(res) {
                    populateAndSortUsers();
                }
            )
        };

        $scope.deleteUser = function(idx) {
            UserService.deleteUserById($scope.users[idx]._id).then(
                function() {
                    populateAndSortUsers();
                }
            )
        };

        $scope.selectUser = function(idx) {
            $scope.currentSelection = idx;
            $scope.username = $scope.users[idx].username;
            $scope.password = $scope.users[idx].password;
            $scope.firstName = $scope.users[idx].firstName;
            $scope.lastName = $scope.users[idx].lastName;
            $scope.rolesString = $scope.users[idx].roles.join();
        };
    }
})();


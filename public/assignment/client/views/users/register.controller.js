(function() {
    "use strict";
    angular
        .module('FormBuilderApp')
        .controller("RegisterController", RegisterController);

    function RegisterController($scope, $rootScope, UserService) {

        $scope.register = function() {
            var user = {};

            user.firstName = "";
            user.lastName = "";
            user.username = $scope.username;
            user.password = $scope.password;
            user.roles = ["student"];
            user.email = $scope.email;

            if ($scope.username === undefined || $scope.password === undefined || $scope.email === undefined) {
                $scope.error = "Please fill in all fields!";
            }
            else if ($scope.password !== $scope.password2) {
                $scope.error = "Passwords do not match!";
            } else {
                // Check for existing user + email, if none exists we create a new one
                UserService.findUserByUsername(user.username, function(foundUser) {
                    if (foundUser === null) {
                        UserService.createUser(user, function() {
                            $rootScope.user = user;
                            $rootScope.loggedIn = true;
                            $scope.$location.path("/profile");
                        });
                    } else {
                        $scope.error = "Username already exists!";
                    }
                });
            }
        }
    }
})();


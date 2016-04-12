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
            user.emails = [$scope.email];

            if ($scope.username === undefined || $scope.password === undefined || $scope.email === undefined) {
                $scope.error = "Please fill in all fields!";
            }
            else if ($scope.password !== $scope.password2) {
                $scope.error = "Passwords do not match!";
            } else {
                // Check for existing user + email, if none exists we create a new one
                UserService.findUserByUsername(user.username).then(
                    function(response) {
                        var foundUser = response.data;
                        console.log(foundUser);
                        if (foundUser === null) {
                            UserService.register(user).then(
                                function(response) {
                                    $rootScope.user = response.data;
                                    $rootScope.loggedIn = true;
                                    $scope.$location.path("/profile");
                                },
                                function(error) {
                                    console.log(error);
                                }
                            );
                        } else {
                            $scope.error = "Username already exists!";
                        }
                    },
                    function(error) {
                        console.log(error);
                    }
                );
            }
        }
    }
})();


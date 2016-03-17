(function() {
    "use strict";
    angular
        .module('FormBuilderApp')
        .controller("LoginController", LoginController);

    function LoginController($scope, $rootScope, UserService) {

        $scope.login = function() {
            UserService.findUserByUsernameAndPassword($scope.username, $scope.password, function(user) {
                if (user === null) {
                    $scope.error = "Invalid username and password combination!";
                } else {
                    $rootScope.loggedIn = true;
                    $rootScope.user = user;
                    for (var i in user.roles) {
                        if (user.roles[i] === "admin") {
                            $rootScope.isAdmin = true;
                        }
                    }
                    $scope.$location.path("/home");
                }
            });
        };

    }
})();


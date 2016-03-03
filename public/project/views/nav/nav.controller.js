(function() {
    "use strict";
    angular
        .module('XPTrackerApp')
        .controller("NavController", NavController);

    function NavController($scope, $rootScope, UserService) {

        $scope.logout = function() {
            console.log("Logging out");
            $scope.loggedIn = false;
        };

        $scope.login = function(username, password) {
            console.log("Logging in with username:pass = " + username + ":" + password);
            UserService.findUserByUsernameAndPassword(username, password, function(user) {
                if (user !== null) {
                    $rootScope.loggedIn = true;
                    $rootScope.user = user;
                    console.log($rootScope);
                    $scope.$location.path("/home");
                }
            });
        };

        $scope.searchPlayer = function(player) {
            console.log("Searching for player: " + player);
            $scope.usernameSearch = "";
        };

        $scope.getClass = function(path) {
            if ($scope.$location.url() === path) {
                return 'active';
            } else if ($scope.$location.url() === "/" && path === "/home") {
                return 'active';
            }
            return '';
        };
    }
})();


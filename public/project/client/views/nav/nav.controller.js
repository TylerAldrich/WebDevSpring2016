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
            UserService.findUserByUsernameAndPassword(username, password).then(
                function(res) {
                    var user = res.data;
                    if (user !== null) {
                        $scope.loggedIn = true;
                        $rootScope.user = user;
                        $scope.$location.path("/home");
                    }
                },
                function(error) {
                    console.log(error);
                }
            );
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


(function() {
    "use strict";
    angular
        .module('XPTrackerApp')
        .controller("NavController", NavController);

    function NavController($scope, $rootScope, $http, UserService) {

        $scope.logout = function() {
            console.log("Logging out");
            UserService.logout().then(
                function() {
                    $rootScope.loggedIn = false;
                    $rootScope.user = null;

                    $scope.$location.path("/home");
                }
            );

        };

        $scope.searchPlayer = function(player) {
            console.log("Searching for player: " + player);
            $scope.$location.path("/search").search({user: player});
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


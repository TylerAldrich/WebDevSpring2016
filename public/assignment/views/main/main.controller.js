(function() {
    "use strict";
    angular
        .module('FormBuilderApp')
        .controller("MainController", MainController);

    function MainController($scope, $location) {
        $scope.$location = $location;
        $scope.loggedIn = true;
        $scope.username = "Blah";
        $scope.isAdmin = true;

        $scope.logout = function() {
            $scope.loggedIn = false;
        };

        $scope.login = function() {
            $scope.loggedIn = true;
            $scope.$location.path("/home");
        };

        $scope.update = function() {
            $route.reload();
        };

        $scope.updateLocation = function() {
            $scope.location = $location.url();
        };
    }
})();

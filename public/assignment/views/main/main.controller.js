(function() {
    "use strict";
    angular
        .module('FormBuilderApp')
        .controller("MainController", MainController);

    function MainController($scope, $rootScope, $location) {
        $scope.$location = $location;
        $rootScope.loggedIn = true;
        $rootScope.username = "Blah";
        $rootScope.isAdmin = true;

        $scope.logout = function() {
            $rootScope.loggedIn = false;
        };

        $scope.login = function() {
            $rootScope.loggedIn = true;
            $scope.$location.path("/home");
        };

        $scope.updateLocation = function() {
            $scope.location = $location.url();
        };
    }
})();

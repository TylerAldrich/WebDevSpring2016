(function() {
    "use strict";
    angular
        .module('FormBuilderApp')
        .controller("MainController", MainController);

    function MainController($scope, $rootScope, $location) {
        $scope.$location = $location;
        $rootScope.loggedIn = false;
        $rootScope.user = null;
        $rootScope.isAdmin = true;

        $scope.logout = function() {
            $rootScope.loggedIn = false;
        };

        $scope.updateLocation = function() {
            $scope.location = $location.url();
        };
    }
})();

(function() {
    "use strict";
    angular
        .module('FormBuilderApp')
        .controller("MainController", MainController);

    function MainController($scope, $rootScope, $location, UserService) {
        $scope.$location = $location;
        $rootScope.loggedIn = false;
        $rootScope.user = null;
        $rootScope.isAdmin = false;

        $scope.logout = function() {
            UserService.logout().then(
                function() {
                    $rootScope.loggedIn = false;
                }
            );
        };

        $scope.updateLocation = function() {
            $scope.location = $location.url();
        };
    }
})();

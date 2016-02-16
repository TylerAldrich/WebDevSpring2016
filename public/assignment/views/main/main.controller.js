(function() {
    "use strict";
    angular
        .module('FormBuilderApp')
        .controller("MainController", MainController);

    function MainController($scope, $location) {
        $scope.loggedIn = true;
        $scope.username = "Blah";
        $scope.isAdmin = true;
        $scope.logout = function() {
            $scope.loggedIn = false;
        }

        $scope.updateLocation = function() {
            $scope.location = $location.url();
        }
    }
})();

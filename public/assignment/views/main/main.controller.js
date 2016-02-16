(function() {
    "use strict";
    angular
        .module('FormBuilderApp')
        .controller("MainController", MainController);

    function MainController($scope, $location) {
        $scope.location = $location.url();
        $scope.loggedIn = true;
        $scope.username = "Blah";
        $scope.isAdmin = true;
        $scope.logout = function() {
            $scope.loggedIn = false;
        }
    }
})();

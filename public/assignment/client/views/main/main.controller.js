(function() {
    "use strict";
    angular
        .module('FormBuilderApp')
        .controller("MainController", MainController);

    function MainController($scope, $rootScope, $location) {
        $scope.$location = $location;
        $rootScope.loggedIn = true;
        $rootScope.user =  {
            "_id": 123,
            "firstName": "Alice",
            "lastName": "Wonderland",
            "username": "alice",
            "password": "alice"
        };
        $rootScope.isAdmin = true;

        $scope.logout = function() {
            $rootScope.loggedIn = false;
        };

        $scope.updateLocation = function() {
            $scope.location = $location.url();
        };
    }
})();

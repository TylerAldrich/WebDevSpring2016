(function() {
    "use strict";
    angular
        .module('FormBuilderApp')
        .controller("MainController", MainController);

    function MainController($scope, $rootScope, $location) {
        $scope.$location = $location;
        $rootScope.loggedIn = true;
        $rootScope.user =  {        "_id":234, "firstName":"Bob",              "lastName":"Hope",
            "username":"bob",    "password":"bob",     "roles": ["admin"]                };
        $rootScope.isAdmin = true;

        $scope.logout = function() {
            $rootScope.loggedIn = false;
        };

        $scope.updateLocation = function() {
            $scope.location = $location.url();
        };
    }
})();

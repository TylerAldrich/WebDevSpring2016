(function() {
    "use strict";
    angular
        .module('XPTrackerApp')
        .controller("MainController", MainController);

    function MainController($scope, $rootScope, $location) {
        $scope.$location = $location;

        $rootScope.user = null;
        $rootScope.loggedIn = false;
    }
})();

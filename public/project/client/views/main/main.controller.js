(function() {
    "use strict";
    angular
        .module('XPTrackerApp')
        .controller("MainController", MainController);

    function MainController($scope, $rootScope, $location) {
        $scope.$location = $location;
        $rootScope.user =  {
            "_id": 123,
            "username":"Tyler",
            "password":"1234",
            "rsAccounts": ["Lord Newb", "Ninjalemon"],
            "clans": ["Foo"]
        };
        $rootScope.loggedIn = true;
    }
})();

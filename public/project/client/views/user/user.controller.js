(function() {
    "use strict";
    angular
        .module('XPTrackerApp')
        .controller("UserController", UserController);

    function UserController($scope, $rootScope, UserService) {

        $scope.userCopy = {};
        angular.copy($rootScope.user, $scope.userCopy);


        $scope.updateUser = function() {
            UserService.updateUser($scope.userCopy._id, $scope.userCopy).then(
                function(newUser) {
                    $rootScope.user = newUser;
                    $scope.$location.url("/home");
                },
                function(error) {
                    console.log(error);
                }
            );
        };
    }
})();

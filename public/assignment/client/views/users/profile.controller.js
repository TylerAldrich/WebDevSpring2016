(function() {
    "use strict";
    angular
        .module('FormBuilderApp')
        .controller("ProfileController", ProfileController);

    function ProfileController($scope, $rootScope, UserService) {
        $scope.oldUser = {};
        angular.copy($rootScope.user, $scope.oldUser);
        $scope.updateProfile = function() {
            UserService.updateUser($scope.oldUser._id, $scope.oldUser, function(newUser) {
                $rootScope.user = newUser;
                $scope.$location.path("/home");
            });
        }
    }
})();


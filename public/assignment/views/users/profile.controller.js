(function() {
    "use strict";
    angular
        .module('FormBuilderApp')
        .controller("ProfileController", ProfileController);

    function ProfileController($scope) {
        $scope.updateProfile = function() {
            $scope.$location.path("/home");
        }
    }
})();


(function() {
    "use strict";
    angular
        .module('FormBuilderApp')
        .controller("SidebarController", SidebarController);

    function SidebarController($scope) {

        $scope.getClass = function(path) {
            if ($scope.$location.url() === path) {
                return 'active';
            } else if ($scope.$location.url() === "/" && path === "/home") {
                return 'active';
            }
            return '';
        }
    }
})();


(function() {
    "use strict";
    angular
        .module('FormBuilderApp')
        .controller("SidebarController", SidebarController);

    function SidebarController($scope, $location) {

        $scope.getClass = function(path) {
            console.log($location.url());
            console.log(path);
            if ($location.url() === path) {
                return 'active';
            } else if ($location.url() === "/" && path === "/home") {
                return 'active';
            }
            return '';
        }
    }
})();


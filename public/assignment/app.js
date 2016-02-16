(function() {
    "use strict";
    angular
        .module('FormBuilderApp', ['ngRoute'])
        .controller("MainController", MainController);

    function MainController($scope) {
        console.log("hi");
    }

})();
(function() {
    "use strict";
    angular
        .module('XPTrackerApp')
        .config(["$routeProvider", declareRoutes]);

    function declareRoutes($routeProvider) {
        $routeProvider.
        when("/", {
            templateUrl: "views/home/home.view.html",
            controller: "HomeController"
        }).
        when("/home", {
            templateUrl: "views/home/home.view.html",
            controller: "HomeController"
        }).
        when("/xptracker", {
            templateUrl: "views/xptracker/xptracker.view.html",
            controller: "XPTrackerController"
        }).
        when("/clans", {
            templateUrl: "views/clans/clans.view.html",
            controller: "ClanController"
        }).
        when("/goals", {
            templateUrl: "views/goals/goals.view.html",
            controller: "GoalController"
        }).
        when("/profile", {
            templateUrl: "views/user/user.view.html",
            controller: "UserController"
        }).
        when("/search", {
            templateUrl: "views/search/search.view.html",
            controller: "SearchController"
        });

    }

})();

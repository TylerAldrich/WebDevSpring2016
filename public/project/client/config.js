(function() {
    "use strict";
    angular
        .module('XPTrackerApp')
        .config(["$routeProvider", declareRoutes]);

    function declareRoutes($routeProvider) {
        $routeProvider.
        when("/", {
            templateUrl: "views/home/home.view.html",
            controller: "HomeController",
            resolve: {
                checkIfLoggedIn: checkIfLoggedIn
            }
        }).
        when("/home", {
            templateUrl: "views/home/home.view.html",
            controller: "HomeController",
            resolve: {
                checkIfLoggedIn: checkIfLoggedIn
            }
        }).
        when("/xptracker", {
            templateUrl: "views/xptracker/xptracker.view.html",
            controller: "XPTrackerController",
            resolve: {
                checkIfLoggedIn: checkIfLoggedIn
            }
        }).
        when("/clans", {
            templateUrl: "views/clans/clans.view.html",
            controller: "ClanController",
            resolve: {
                checkIfLoggedIn: checkIfLoggedIn
            }
        }).
        when("/goals", {
            templateUrl: "views/goals/goals.view.html",
            controller: "GoalController",
            resolve: {
                checkIfLoggedIn: checkIfLoggedIn
            }
        }).
        when("/profile", {
            templateUrl: "views/user/user.view.html",
            controller: "UserController",
            resolve: {
                checkIfLoggedIn: checkIfLoggedIn
            }
        }).
        when("/search", {
            templateUrl: "views/search/search.view.html",
            controller: "SearchController",
            resolve: {
                checkIfLoggedIn: checkIfLoggedIn
            }
        }).
        when("/admin", {
            templateUrl: "views/admin/admin.view.html",
            controller: "AdminController",
            resolve: {
                checkIfAdmin: checkIfAdmin,
                checkIfLoggedIn: checkIfLoggedIn
            }
        });

    }

    function checkIfAdmin($q, $http, $rootScope, $location) {
        var deferred = $q.defer();

        $http.get("/api/project/loggedin").success(
            function(user) {
                if (user !== "0" && user.isAdmin) {
                    $rootScope.user = user;
                    $rootScope.loggedIn = true;
                    deferred.resolve();
                } else {
                    $rootScope.error = "You need to be an admin to view this.";
                    deferred.reject();
                    $location.url('/home');
                }
            }
        );

        return deferred.promise;
    }

    function checkIfLoggedIn($q, $http, $rootScope, $location) {
        var deferred = $q.defer();

        $http.get("/api/project/loggedin").success(
            function(user) {
                if (user !== "0") {
                    $rootScope.user = user;
                    $rootScope.loggedIn = true;
                } else {
                    $rootScope.user = null;
                    $rootScope.loggedIn = false;
                    $location.path("/home");
                }
                deferred.resolve();
            }
        );

        return deferred.promise;
    }

})();

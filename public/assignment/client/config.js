(function() {
    "use strict";
    angular
        .module('FormBuilderApp')
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
            when("/register", {
                templateUrl: "views/users/register.view.html",
                controller: "RegisterController"
            }).
            when("/login", {
                templateUrl: "views/users/login.view.html",
                controller: "LoginController"
            }).
            when("/profile", {
                templateUrl: "views/users/profile.view.html",
                controller: "ProfileController",
                resolve: {
                    checkIfLoggedIn: checkIfLoggedIn,
                    loggedIn: isLoggedIn
                }
            }).
            when("/admin", {
                templateUrl: "views/admin/admin.view.html",
                controller: "AdminController",
                resolve: {
                    checkIfLoggedIn: checkIfLoggedIn,
                    checkAdmin: checkAdmin
                }
            }).
            when("/forms", {
                templateUrl: "views/forms/forms.view.html",
                controller: "FormsController",
                resolve: {
                    checkIfLoggedIn: checkIfLoggedIn
                }
            })
            .when("/forms/:formId/fields", {
                templateUrl: "views/fields/fields.view.html",
                controller: "FieldsController",
                resolve: {
                    checkIfLoggedIn: checkIfLoggedIn
                }
            });
    }

    function checkIfLoggedIn($q, $http, $rootScope) {
        var deferred = $q.defer();

        $http.get("/api/assignment/loggedin").success(
            function(user) {
                if (user !== "0") {
                    $rootScope.user = user;
                    $rootScope.loggedIn = true;
                    if (user.roles.indexOf("admin") > 0) {
                        $rootScope.isAdmin = true;
                    }
                }
                deferred.resolve();
            }
        );

        return deferred.promise;
    }

    function isLoggedIn($q, $http, $rootScope, $location) {
        var deferred = $q.defer();

        $http.get("/api/assignment/loggedin").success(
            function(user) {
                $rootScope.error = null;
                if (user !== "0") {
                    $rootScope.user = user;
                    $rootScope.loggedIn = true;
                    deferred.resolve();
                } else {
                    $rootScope.error = "You need to log in.";
                    deferred.reject();
                    $location.url('/login');
                }
            }
        );

        return deferred.promise;
    }

    function checkAdmin($q, $http, $rootScope, $location) {
        var deferred = $q.defer();

        $http.get("/api/assignment/loggedin").success(
            function(user) {
                if (user !== "0" && user.roles.indexOf('admin') !== -1) {
                    $rootScope.user = user;
                    $rootScope.loggedIn = true;
                    deferred.resolve();
                } else {
                    $rootScope.error = "You need to be an admin to view this.";
                    deferred.reject();
                    $location.url('/login');
                }
            }
        );

        return deferred.promise;
    }

})();

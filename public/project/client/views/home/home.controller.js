(function() {
    "use strict";
    angular
        .module('XPTrackerApp')
        .controller("HomeController", HomeController);

    function HomeController($scope, $rootScope, FollowingService, $http, UserService) {
        $scope.selectedIdx = null;
        if ($rootScope.user !== null) {
            getFollowing();
        }

        function getFollowing() {
            FollowingService.getFollowing($scope.user._id).then(
                function(res) {
                    $scope.following = res.data;
                },
                function(error) {
                    console.log(error);
                }
            );
        }

        $scope.login = function(username, password) {
            console.log("Logging in with username:pass = " + username + ":" + password);

            UserService.findUserByUsernameAndPassword(username, password).then(
                function(res) {
                    var user = res.data;
                    if (user !== null) {
                        $http.post('/api/project/login', user).then(
                            function(res) {
                                $rootScope.loggedIn = true;
                                $rootScope.user = res.data;
                                $scope.$location.path("/home");
                                getFollowing();
                            }
                        )
                    } else {
                        $scope.error = "Invalid Login Credentials"
                    }
                },
                function(error) {
                    console.log(error);
                }
            );
        };

        $scope.register = function(username, pw, pw2) {
            console.log("Registering user with user:pass:pass2 = " + username + ":" + pw + ":" + pw2);
            if (pw !== pw2) {
                $scope.registerError = "Passwords do not match.";
                return;
            }
            UserService.findUserByUsername(username).then(
                function(res) {
                    if (res.data !== null) {
                        $scope.registerError = "Username already exists!";
                    } else {
                        var u = {
                            username: username,
                            password: pw,
                            email: "",
                            rsAccounts: [],
                            clans: []
                        };
                        UserService.register(u).then(
                            function(res) {
                                $rootScope.user = res.data;
                                $rootScope.loggedIn = true;
                            },
                            function(error) {
                                console.log(error);
                            }
                        )
                    }
                },
                function(error) {
                    console.log(error);
                }
            )
        };

        $scope.addFollowing = function() {
            var newFollowing = {username: $scope.username};
            FollowingService.addFollower($scope.user._id, newFollowing).then(
                function(res) {
                    $scope.following.push(res.data);
                },
                function(error) {
                    console.log(error);
                }
            );
        };

        $scope.deleteFollowing = function(idx) {
            var followId = $scope.following[idx]._id;
            FollowingService.deleteFollow(followId).then(
                function() {
                    getFollowing();
                },
                function(error) {
                    console.log(error);
                }
            );
        };

        $scope.selectFollowing = function(idx) {
            $scope.selectedIdx = idx;
            $scope.username = $scope.following[idx].username;
        };

        $scope.updateFollowing = function() {
            if ($scope.selectedIdx === null || $scope.username === undefined) return;
            var followerId = $scope.following[$scope.selectedIdx]._id;
            var follow = {
                _id: followerId,
                username: $scope.username,
                userId: $scope.user._id
            };

            FollowingService.updateFollow(followerId, follow).then(
                function(res) {
                    $scope.following[$scope.selectedIdx] = res.data;
                },
                function(error) {
                    console.log(error);
                }
            );
        };
    }
})();


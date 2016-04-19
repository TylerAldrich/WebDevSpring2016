(function() {
    "use strict";
    angular
        .module('XPTrackerApp')
        .controller("HomeController", HomeController);

    function HomeController($scope, $rootScope, $http, FollowingService,
                            UserService, GoalService, PlayerService) {
        $scope.selectedIdx = null;
        $scope.newPlayer = {};
        $scope.following = [];
        $rootScope.recentUpdates = [];
        if ($rootScope.user !== null) {
            getFollowing();
        }

        function getFollowing() {
            FollowingService.getFollowing($scope.user._id).then(
                function(res) {
                    $scope.following = res.data || [];
                    getUpdates();

                    $rootScope.recentUpdates.sort(function(a,b) {
                       return b.realTime - a.realTime;
                    });
                    //console.log($scope.recentUpdates);
                },
                function(error) {
                    console.log(error);
                }
            );
        }

        function getUpdates() {
            var accounts = $scope.user.rsAccounts;
            for (var i = 0; i < $scope.following.length; i++) {
                if (accounts.indexOf($scope.following[i].username) === -1) {
                    accounts.push($scope.following[i].username);
                }
            }
            fetchData(accounts);
        }

        // Recursively get data from all accounts
        function fetchData(accounts) {
            var username = accounts.pop();
            PlayerService.findPlayer(username).then(
                function(res) {
                    var player = res.data;
                    GoalService.findPlayerGoal(username).then(
                        function(res) {
                            var goals = res.data;
                            createUpdateRows(player, goals);
                            if (accounts.length > 0) {
                                fetchData(accounts);
                            }
                        }
                    )
                }
            )
        }

        function createUpdateRows(player, goals) {
            var rows = [];
            var stats = ["attack", "strength", "defense", "ranged", "magic", "prayer"];
            for (var i = 0; i < goals.length; i++) {
                for (var j = 0; j < stats.length; j++) {
                    var stat = stats[j];
                    if (player[stat] > goals[i][stat]) {
                        var row = {};
                        row.player = player.playerName;
                        row.goal = goals[i][stat] + " XP in " + stat + " achieved!";
                        row.timeString = timeSince(new Date(player.date)) + " ago";
                        row.realTime = new Date(player.date);
                        rows.push(row);
                    }
                }
            }

            for (var k = 0; k < rows.length; k++) {
                $rootScope.recentUpdates.push(rows[k]);
            }
        }

        function timeSince(date) {
            var seconds = Math.floor((new Date() - date) / 1000);

            var interval = Math.floor(seconds / 31536000);

            if (interval > 1) {
                return interval + " years";
            }
            interval = Math.floor(seconds / 2592000);
            if (interval > 1) {
                return interval + " months";
            }
            interval = Math.floor(seconds / 86400);
            if (interval > 1) {
                return interval + " days";
            }
            interval = Math.floor(seconds / 3600);
            if (interval > 1) {
                return interval + " hours";
            }
            interval = Math.floor(seconds / 60);
            if (interval > 1) {
                return interval + " minutes";
            }
            return Math.floor(seconds) + " s";
        }

        $scope.login = function(username, password) {
            console.log("Logging in with username:pass = " + username + ":" + password);

            UserService.login(username, password).then(
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
            var newFollowing = {username: $scope.newPlayer.username};
            FollowingService.addFollower($scope.user._id, newFollowing).then(
                function() {
                    getFollowing();
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
            $scope.newPlayer.username = $scope.following[idx].username;
        };

        $scope.updateFollowing = function() {
            if ($scope.selectedIdx === null || $scope.newPlayer.username === undefined) return;
            var followerId = $scope.following[$scope.selectedIdx]._id;
            var follow = {
                _id: followerId,
                username: $scope.newPlayer.username,
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


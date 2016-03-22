(function() {
    "use strict";
    angular
        .module('XPTrackerApp')
        .controller("HomeController", HomeController);

    function HomeController($scope, FollowingService) {
        $scope.selectedIdx = null;
        getFollowing();

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


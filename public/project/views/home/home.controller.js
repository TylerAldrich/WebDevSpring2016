(function() {
    "use strict";
    angular
        .module('XPTrackerApp')
        .controller("HomeController", HomeController);

    function HomeController($scope, FollowingService) {
        $scope.selectedIdx = null;

        FollowingService.getFollowing($scope.user._id, function(following) {
            $scope.following = following;
        });

        $scope.addFollowing = function() {
            FollowingService.addFollower($scope.user._id, $scope.username, function(newFollow) {
                $scope.following.push(newFollow);
            });
        };

        $scope.deleteFollowing = function(idx) {
            var followId = $scope.following[idx]._id;
            FollowingService.deleteFollow(followId, function(newFollowing) {
                FollowingService.getFollowing($scope.user._id, function(following) {
                    $scope.following = following;
                });
            });
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

            FollowingService.updateFollow(followerId, follow, function(newFollowing) {
                $scope.following[$scope.selectedIdx] = newFollowing;
            });
        };
    }
})();


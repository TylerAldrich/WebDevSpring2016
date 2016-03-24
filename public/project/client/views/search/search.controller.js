(function() {
    "use strict";
    angular
        .module('XPTrackerApp')
        .controller("SearchController", SearchController);

    function SearchController($scope, $routeParams, UserService, FollowingService) {
        $scope.userSearched = $routeParams.user;
        getUser();

        function getUser() {
            UserService.findUserByUsername($scope.userSearched).then(
                function(res) {
                    if (res.data !== null) {
                        $scope.userFound = res.data;
                        getFollowers(res.data);
                    } else {
                        $scope.error = "No User Exists!";
                    }
                },
                function(error) {
                    console.log(error);
                }
            )
        }

        function getFollowers(user) {
            console.log(user);
            FollowingService.getFollowing(user._id).then(
                function(res) {
                    $scope.userFollowing = res.data;
                },
                function(error) {
                    console.log(error);
                }
            );
        }
    }
})();


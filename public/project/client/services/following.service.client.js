(function() {
    "use strict";
    angular
        .module('XPTrackerApp')
        .factory("FollowingService", FollowingService);

    function FollowingService($http) {

        var factory = {
            getFollowing: getFollowing,
            addFollower: addFollower,
            deleteFollow: deleteFollow,
            updateFollow: updateFollow
        };
        return factory;

        function getFollowing(userId) {
            return $http.get("/api/project/user/" + userId + "/following");
        }

        function addFollower(userId, newFollow) {
            return $http.post("/api/project/user/" + userId + "/following", newFollow);
        }

        function deleteFollow(followId) {
            return $http.delete("/api/project/following/" + followId);
        }

        function updateFollow(followId, newFollow) {
            return $http.put("/api/project/following/" + followId, newFollow);
        }
    }
})();

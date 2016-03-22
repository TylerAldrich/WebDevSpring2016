(function() {
    "use strict";
    angular
        .module('XPTrackerApp')
        .factory("FollowingService", FollowingService);

    function FollowingService($http) {

        var factory = {};

        factory.getFollowing = function(userId) {
            return $http.get("/api/project/user/" + userId + "/following");
        };

        factory.addFollower = function(userId, newFollow) {
            return $http.post("/api/project/user/" + userId + "/following", newFollow);
        };

        factory.deleteFollow = function(followId) {
            return $http.delete("/api/project/following/" + followId);
        };

        factory.updateFollow = function(followId, newFollow) {
            return $http.put("/api/project/following/" + followId, newFollow);
        };

        return factory;
    }
})();

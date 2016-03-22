(function() {
    "use strict";
    angular
        .module('XPTrackerApp')
        .factory("FollowingService", FollowingService);

    function FollowingService() {

        var factory = {};

        // ClanService contains info about specific clans, GoalService about all goals
        factory.following = [
            {
                "_id": 0,
                "userId": 123,
                "username": "Bob123"
            },
            {
                "_id": 1,
                "userId": 123,
                "username": "Ninjalemon"
            },
            {
                "_id": 2,
                "userId": 234,
                "username": "JBarry"
            },
            {
                "_id": 3,
                "userId": 123,
                "username": "TDrich"
            },
        ];

        factory.getFollowing = function(userId, callback) {
            var userFollowing = [];
            for (var i in factory.following) {
                if (factory.following[i].userId === userId) {
                    userFollowing.push(factory.following[i]);
                }
            }
            callback(userFollowing);
        };

        factory.addFollower = function(userId, username, callback) {
            var newFollow = {};
            newFollow._id = (new Date).getTime();
            newFollow.userId = userId;
            newFollow.username = username;

            factory.following.push(newFollow);
            callback(newFollow);
        };

        factory.deleteFollow = function(followId, callback) {
            var newFollowing = [];
            for (var i in factory.following) {
                if (factory.following[i]._id !== followId) {
                    newFollowing.push(factory.following[i]);
                }
            }

            factory.following = newFollowing;
            callback(newFollowing);
        };

        factory.updateFollow = function(followId, newFollow, callback) {
            for (var i in factory.following) {
                if (factory.following[i]._id === followId) {
                    factory.following[i] = newFollow;
                    callback(newFollow);
                    return;
                }
            }
            callback(null);
        };

        return factory;
    }
})();

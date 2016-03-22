var following = require("./following.mock.json");

module.exports = function() {
    "use strict";
    var api = {
        createFollowing: createFollowing,
        deleteFollowing: deleteFollowing,
        updateFollowing: updateFollowing,
        findFollowing: findFollowing
    };
    return api;

    function createFollowing(userId, newFollow) {
        newFollow._id = (new Date).getTime();
        newFollow.userId = userId;

        following.push(newFollow);
        return newFollow;
    }

    function deleteFollowing(followId) {
        var newFollowing = [];
        for (var i in following) {
            if (following[i]._id !== followId) {
                newFollowing.push(following[i]);
            }
        }
        following = newFollowing;
        return following;
    }

    function updateFollowing(followId, newFollow) {
        for (var i in following) {
            if (following[i]._id === followId) {
                following[i] = newFollow;
                return newFollow;
            }
        }
        return null;
    }

    function findFollowing(userId) {
        var userFollowing = [];
        for (var i in following) {
            if (following[i].userId === userId) {
                userFollowing.push(following[i]);
            }
        }
        return userFollowing;
    }

};
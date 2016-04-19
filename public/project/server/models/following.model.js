var q = require('q');

module.exports = function(mongoose) {
    "use strict";

    var FollowingSchema = require("./following.server.schema.js")(mongoose);
    var FollowingModel = mongoose.model("FollowingModel", FollowingSchema);

    var api = {
        createFollowing: createFollowing,
        deleteFollowing: deleteFollowing,
        updateFollowing: updateFollowing,
        findFollowing: findFollowing
    };
    return api;

    function createFollowing(userId, newFollow) {
        newFollow.userId = userId;
        var deferred = q.defer();
        FollowingModel.create(newFollow,
            function(err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc);
                }
            }
        );
        return deferred.promise;
    }

    function deleteFollowing(followId) {
        var deferred = q.defer();
        FollowingModel.remove({_id: followId}, function(err, status) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(status);
            }
        });
        return deferred.promise;
    }

    function updateFollowing(followId, newFollow) {
        var deferred = q.defer();
        FollowingModel.findById(followId, function(err, doc) {
            var fields = Object.keys(newFollow);
            for (var i in fields) {
                doc[fields[i]] = newFollow[fields[i]];
            }

            doc.save(function(err, doc) {
                deferred.resolve(doc);
            });
        });
        return deferred.promise;
    }

    function findFollowing(userId) {
        var deferred = q.defer();
        FollowingModel.find({userId: userId}, function(err, following) {
            if (err) {
                deferred.resolve(err);
            } else {
                deferred.resolve(following);
            }
        });
        return deferred.promise;
    }
};
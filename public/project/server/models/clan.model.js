var q = require('q');

module.exports = function(mongoose) {
    "use strict";

    var ClanSchema = require("./clan.server.schema.js")(mongoose);
    var ClanModel = mongoose.model("ClanModel", ClanSchema);

    var api = {
        createClan: createClan,
        deleteClan: deleteClan,
        updateClan: updateClan,
        findClan: findClan
    };
    return api;

    function createClan(userId, newClan) {
        newClan.ownerId = userId;

        var deferred = q.defer();
        ClanModel.create(newClan,
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

    function deleteClan(clanId) {
        var deferred = q.defer();
        ClanModel.remove({_id: clanId}, function(err, status) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(status);
            }
        });
        return deferred.promise;
    }

    function updateClan(clanId, newClan) {
        var deferred = q.defer();
        ClanModel.findById(clanId, function(err, doc) {
            var fields = Object.keys(newClan);
            for (var i in fields) {
                doc[fields[i]] = newClan[fields[i]];
            }

            doc.save(function(err, doc) {
                deferred.resolve(doc);
            });
        });
        return deferred.promise;
    }

    function findClan(userId) {
        var deferred = q.defer();
        ClanModel.find({ownerId: userId}, function(err, clans) {
            if (err) {
                deferred.resolve(err);
            } else {
                deferred.resolve(clans);
            }
        });
        return deferred.promise;
    }
};
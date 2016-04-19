var q = require('q');

module.exports = function(mongoose) {
    "use strict";

    var PlayerSchema = require("./player.server.schema.js")(mongoose);
    var PlayerModel = mongoose.model("PlayerModel", PlayerSchema);

    var api = {
        createPlayer: createPlayer,
        findPlayer: findPlayer,
        findAllPlayers: findAllPlayers,
        updatePlayer: updatePlayer,
        deletePlayer: deletePlayer
    };
    return api;

    function createPlayer(player) {
        var deferred = q.defer();
        PlayerModel.create(player,
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

    function findPlayer(playerName) {
        var deferred = q.defer();
        PlayerModel.findOne({playerName: playerName}, function(err, player) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(player);
            }
        });
        return deferred.promise;
    }

    function findAllPlayers(userId) {
        var deferred = q.defer();
        PlayerModel.find({userId: userId}, function(err, players) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(players);
            }
        });
        return deferred.promise;
    }

    function updatePlayer(playerId, player) {
        var deferred = q.defer();
        PlayerModel.findById(playerId, function(err, doc) {
            var fields = Object.keys(player);
            for (var i in fields) {
                doc[fields[i]] = player[fields[i]];
            }

            doc.save(function(err, doc) {
                deferred.resolve(doc);
            });
        });
        return deferred.promise;
    }

    function deletePlayer(playerId) {
        var deferred = q.defer();
        PlayerModel.remove({_id: playerId}, function(err, status) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(status);
            }
        });
        return deferred.promise;
    }
};
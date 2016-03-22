(function() {
    "use strict";
    angular
        .module('XPTrackerApp')
        .factory("PlayerService", PlayerService);

    function PlayerService() {

        var factory = {};

        factory.players = [
            {
                "_id": 0,
                "userId": 123,
                "playerName": "Lord Newb",
                "attack": 12345,
                "defense": 12345,
                "strength": 12345,
                "ranged": 12345,
                "magic": 12345,
                "prayer": 666,
                "date": 1456364470238
            },
            {
                "_id": 1,
                "userId": 234,
                "playerName": "Bob123",
                "attack": 4312,
                "defense": 123431245,
                "strength": 12321345,
                "ranged": 431,
                "magic": 121234345,
                "prayer": 4321,
                "date": 1456364470238
            },
            {
                "_id": 2,
                "userId": 123,
                "playerName": "BestPlayer",
                "attack": 2341232,
                "defense": 123143245,
                "strength": 144444444345,
                "ranged": 2122121211,
                "magic": 7654,
                "prayer": 7564641,
                "date": 1456968372849
            },
            {
                "_id": 3,
                "userId": 123,
                "playerName": "Lord Newb",
                "attack": 22345,
                "defense": 22345,
                "strength": 22345,
                "ranged": 22345,
                "magic": 22345,
                "prayer": 667,
                "date": 1456968514876
            }
        ];

        factory.findPlayer = function(playerName, callback) {
            for (var i in factory.players) {
                if (factory.players[i].playerName === playerName) {
                    callback(factory.players[i]);
                    return;
                }
            }
            callback(null);
        };

        factory.findAllPlayers = function(userId, callback) {
            var players = [];
            for (var i in factory.players) {
                if (factory.players[i].userId === userId) {
                    players.push(factory.players[i]);
                }
            }
            callback(players);
        };

        factory.createPlayer = function(player, callback) {
            player._id = (new Date).getTime();
            factory.players.push(player);
            callback(player);
        };

        factory.deletePlayerById = function(playerId, callback) {
            var newPlayers = [];
            for (var i in factory.players) {
                if (factory.players[i]._id !== playerId) {
                    newPlayers.push(factory.players[i]);
                }
            }
            factory.players = newPlayers;
            callback(factory.players);
        };

        factory.updatePlayer = function(playerId, player, callback) {
            for (var i in factory.players) {
                if (factory.players[i]._id === playerId) {
                    factory.players[i] = player;
                    callback(player);
                    return;
                }
            }
            callback(null);
        };

        return factory;
    }
})();


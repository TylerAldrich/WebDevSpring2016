var players = require("./player.mock.json");

module.exports = function() {
    "use strict";
    var api = {
        createPlayer: createPlayer,
        findPlayer: findPlayer,
        findAllPlayers: findAllPlayers,
        updatePlayer: updatePlayer,
        deletePlayer: deletePlayer
    };
    return api;

    function createPlayer(player) {
        player._id = (new Date).getTime();
        players.push(player);
        return player;
    }

    function findPlayer(playerName) {
        for (var i in players) {
            if (players[i].playerName === playerName) {
                return players[i];
            }
        }
        return null;
    }

    function findAllPlayers(userId) {
        var foundPlayers = [];

        for (var i in players) {
            if (players[i].userId === userId) {
                foundPlayers.push(players[i]);
            }
        }
        return foundPlayers;
    }

    function updatePlayer(playerId, player) {
        for (var i in players) {
            if (players[i]._id === playerId) {
                players[i] = player;
                return player;
            }
        }
        return null;
    }

    function deletePlayer(playerId) {
        var newPlayers = [];
        for (var i in players) {
            if (players[i]._id !== playerId) {
                newPlayers.push(players[i]);
            }
        }
        players = newPlayers;
        return players;
    }
};
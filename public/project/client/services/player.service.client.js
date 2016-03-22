(function() {
    "use strict";
    angular
        .module('XPTrackerApp')
        .factory("PlayerService", PlayerService);

    function PlayerService($http) {

        var factory = {};

        factory.findPlayer = function(playerName) {
            // http get
        };

        factory.findAllPlayers = function(userId) {
            // http get
        };

        factory.createPlayer = function(player) {
            // http post
        };

        factory.deletePlayerById = function(playerId) {
            // http delete
        };

        factory.updatePlayer = function(playerId, player) {
            // http put
        };

        return factory;
    }
})();


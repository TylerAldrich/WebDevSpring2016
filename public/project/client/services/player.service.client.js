(function() {
    "use strict";
    angular
        .module('XPTrackerApp')
        .factory("PlayerService", PlayerService);

    function PlayerService($http) {

        var factory = {};

        factory.findPlayer = function(playerName) {
            return $http.get("/api/project/player/" + playerName);
        };

        factory.findAllPlayers = function(userId) {
            return $http.get("/api/project/user/" + userId + "/player");
        };

        factory.createPlayer = function(player) {
            return $http.post("/api/project/player", player);
        };

        factory.deletePlayerById = function(playerId) {
            return $http.delete("/api/project/player/" + playerId);
        };

        factory.updatePlayer = function(playerId, player) {
            return $http.put("/api/project/player/" + playerId, player);
        };

        return factory;
    }
})();


(function() {
    "use strict";
    angular
        .module('XPTrackerApp')
        .factory("PlayerService", PlayerService);

    function PlayerService($http) {

        var factory = {
            findPlayer: findPlayer,
            findAllPlayers: findAllPlayers,
            createPlayer: createPlayer,
            deletePlayerById: deletePlayerById,
            updatePlayer: updatePlayer
        };
        return factory;

        function findPlayer(playerName) {
            return $http.get("/api/project/player/" + playerName);
        }

        function findAllPlayers(userId) {
            return $http.get("/api/project/user/" + userId + "/player");
        }

        function createPlayer(player) {
            return $http.post("/api/project/player", player);
        }

        function deletePlayerById(playerId) {
            return $http.delete("/api/project/player/" + playerId);
        }

        function updatePlayer(playerId, player) {
            return $http.put("/api/project/player/" + playerId, player);
        }
    }
})();


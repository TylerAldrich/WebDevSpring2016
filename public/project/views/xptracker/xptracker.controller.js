(function() {
    "use strict";
    angular
        .module('XPTrackerApp')
        .controller("XPTrackerController", XPTrackerController);

    function XPTrackerController($scope, PlayerService) {
        $scope.selectedIdx = null;

        PlayerService.findAllPlayers($scope.user._id, function(players) {
            $scope.players = players;
        });

        $scope.addPlayer = function() {
            var player = {};
            player._id = $scope.user._id;
            player.playerName = $scope.playerName;
            player.attack = $scope.attack;
            player.strength = $scope.strength;
            player.defense = $scope.defense;
            player.ranged = $scope.ranged;
            player.magic = $scope.magic;
            player.prayer = $scope.prayer;

            PlayerService.createPlayer(player, function(newPlayer) {
                $scope.players.push(newPlayer);
            });
        };

        $scope.deletePlayer = function(idx) {
            var playerId = $scope.players[idx]._id;
            PlayerService.deletePlayerById(playerId, function() {
                PlayerService.findAllPlayers($scope.user._id, function(players) {
                    $scope.players = players;
                });
            });
        };

        $scope.selectPlayer = function(idx) {
            $scope.selectedIdx = idx;
            $scope.playerName = $scope.players[idx].playerName;
            $scope.attack = $scope.players[idx].attack;
            $scope.defense = $scope.players[idx].defense;
            $scope.strength = $scope.players[idx].strength;
            $scope.magic = $scope.players[idx].magic;
            $scope.ranged = $scope.players[idx].ranged;
            $scope.prayer = $scope.players[idx].prayer;

        };

        $scope.updatePlayer = function() {
            if ($scope.selectedIdx === null) return;
            var player = $scope.players[$scope.selectedIdx];
            player.playerName = $scope.playerName;
            player.attack = $scope.attack;
            player.strength = $scope.strength;
            player.defense = $scope.defense;
            player.ranged = $scope.ranged;
            player.magic = $scope.magic;
            player.prayer = $scope.prayer;


            PlayerService.updatePlayer(player._id, player, function(newPlayer) {
                $scope.players[$scope.selectedIdx] = newPlayer;
            });
        };
    }
})();

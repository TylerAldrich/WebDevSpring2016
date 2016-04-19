(function() {
    "use strict";
    angular
        .module('XPTrackerApp')
        .controller("XPTrackerController", XPTrackerController);

    function XPTrackerController($scope, $rootScope, PlayerService, UserService) {
        $scope.selectedIdx = null;
        getPlayers();

        function getPlayers() {
            PlayerService.findAllPlayers($scope.user._id).then(
                function(res) {
                    var players = res.data;
                    for (var i in players) {
                        players[i].date = new Date(players[i].date);
                    }
                    $scope.players = players;
                },
                function(error) {
                    console.log(error);
                }
            );
        }

        $scope.addPlayer = function() {
            var player = {};
            player.userId = $scope.user._id;
            player.playerName = $scope.playerName;
            player.attack = $scope.attack;
            player.strength = $scope.strength;
            player.defense = $scope.defense;
            player.ranged = $scope.ranged;
            player.magic = $scope.magic;
            player.prayer = $scope.prayer;
            player.date = new Date();

            PlayerService.createPlayer(player).then(
                function(res) {
                    var newPlayer = res.data;
                    newPlayer.date = new Date(newPlayer.date);
                    $scope.players.push(newPlayer);
                },
                function(error) {
                    console.log(error);
                }
            );

            if ($scope.user.rsAccounts.indexOf(player.playerName) === -1) {
                $scope.user.rsAccounts.push(player.playerName);

                UserService.updateUser($scope.user._id, $scope.user).then(
                    function(newUser) {
                        $rootScope.user = newUser;
                    },
                    function(error) {
                        console.log(error);
                    }
                );
            }
        };

        $scope.deletePlayer = function(idx) {
            var playerId = $scope.players[idx]._id;
            PlayerService.deletePlayerById(playerId).then(
                function() {
                    getPlayers();
                },
                function(error) {
                    console.log(error);
                }
            );
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
            player.date = new Date();

            PlayerService.updatePlayer(player._id, player).then(
                function() {
                    getPlayers();
                },
                function(error) {
                    console.log(error);
                }
            );
        };
    }
})();

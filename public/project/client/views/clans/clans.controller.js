(function() {
    "use strict";
    angular
        .module('XPTrackerApp')
        .controller("ClanController", ClanController);

    function ClanController($scope, ClanService) {
        $scope.selectedIdx = null;
        getClans();

        function getClans() {
            ClanService.getClans($scope.user._id).then(
                function(res) {
                    $scope.clans = res.data;
                },
                function(error) {
                    console.log(error);
                }
            );
        }

        $scope.addClan = function() {
            var clan = {};
            clan.clanName = $scope.clanName;
            clan.players = $scope.players.split(',');

            ClanService.addClan($scope.user._id, clan).then(
                function(res) {
                    $scope.clans.push(res.data);
                },
                function(error) {
                    console.log(error);
                }
            );
        };

        $scope.deleteClan = function(idx) {
            var clanId = $scope.clans[idx]._id;
            ClanService.deleteClan(clanId).then(
                function() {
                    getClans();
                },
                function(error) {
                    console.log(error);
                }
            );
        };

        $scope.selectClan = function(idx) {
            $scope.selectedIdx = idx;
            $scope.clanName = $scope.clans[idx].clanName;
            $scope.players = $scope.clans[idx].players;
        };

        $scope.updateClan = function() {
            if ($scope.selectedIdx === null) return;
            var clan = $scope.clans[$scope.selectedIdx];
            clan.clanName = $scope.clanName;
            if (typeof $scope.players === "string") {
                clan.players = $scope.players.split(',');
            } else {
                clan.players = $scope.players;
            }

            ClanService.updateClan(clan._id, clan).then(
                function(res) {
                    $scope.clans[$scope.selectedIdx] = res.data;
                },
                function(error) {
                    console.log(error);
                }
            );
        };
    }
})();

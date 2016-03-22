(function() {
    "use strict";
    angular
        .module('XPTrackerApp')
        .controller("ClanController", ClanController);

    function ClanController($scope, ClanService) {
        $scope.selectedIdx = null;

        ClanService.getClans($scope.user._id, function(clans) {
            $scope.clans = clans;
        });

        $scope.addClan = function() {
            var clan = {};
            clan.clanName = $scope.clanName;
            clan.players = $scope.players.split(',');

            ClanService.addClan($scope.user._id, clan, function(newClan) {
                $scope.clans.push(newClan);
            });
        };

        $scope.deleteClan = function(idx) {
            var clanId = $scope.clans[idx]._id;
            ClanService.deleteClan(clanId, function() {
                ClanService.getClans($scope.user._id, function(clans) {
                    $scope.clans = clans;
                });
            });
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
            clan.players = $scope.players.split(',');

            ClanService.updateClan(clan._id, clan, function(newClan) {
                $scope.clans[$scope.selectedIdx] = newClan;
            });
        };
    }
})();

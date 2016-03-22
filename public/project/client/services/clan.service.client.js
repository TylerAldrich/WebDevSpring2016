(function() {
    "use strict";
    angular
        .module('XPTrackerApp')
        .factory("ClanService", ClanService);

    function ClanService($http) {

        var factory = {
            getClans: getClans,
            addClan: addClan,
            deleteClan: deleteClan,
            updateClan: updateClan
        };
        return factory;

        function getClans(userId) {
            return $http.get("/api/project/user/" + userId + "/clan");
        }

        function addClan(userId, clan) {
            return $http.post("/api/project/user/" + userId + "/clan", clan);
        }

        function deleteClan(clanId) {
            return $http.delete("/api/project/clan/" + clanId);
        }

        function updateClan(clanId, newClan) {
            return $http.put("/api/project/clan/" + clanId, newClan);
        }
    }
})();

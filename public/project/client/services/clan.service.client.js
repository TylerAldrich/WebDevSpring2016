(function() {
    "use strict";
    angular
        .module('XPTrackerApp')
        .factory("ClanService", ClanService);

    function ClanService() {

        var factory = {
            getClans: getClans,
            addClan: addClan,
            deleteClan: deleteClan,
            updateClan: updateClan
        };
        return factory;

        function getClans(userId) {
            var userClans = [];
            for (var i in factory.clans) {
                if (factory.clans[i].ownerId === userId) {
                    userClans.push(factory.clans[i]);
                }
            }
            callback(userClans);
        }

        function addClan(userId, clan) {
            clan._id = (new Date).getTime();
            clan.ownerId = userId;

            factory.clans.push(clan);
            callback(clan);
        }

        function deleteClan(clanId) {
            var newClans = [];
            for (var i in factory.clans) {
                if (factory.clans[i]._id !== clanId) {
                    newClans.push(factory.clans[i]);
                }
            }

            factory.clans = newClans;
            callback(newClans);
        }

        function updateClan(clanId, newClan) {
            for (var i in factory.clans) {
                if (factory.clans[i]._id === clanId) {
                    factory.clans[i] = newClan;
                    callback(newClan);
                    return;
                }
            }
            callback(null);
        }
    }
})();

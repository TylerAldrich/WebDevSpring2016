(function() {
    "use strict";
    angular
        .module('XPTrackerApp')
        .factory("ClanService", ClanService);

    function ClanService() {

        var factory = {};

        // ClanService contains info about specific clans, GoalService about all goals
        factory.clans = [
            {
                "_id": 0,
                "ownerId": 123,
                "clanName": "The Pwners",
                "players": ["Lord Newb", "Tyler"]
            },
            {
                "_id": 1,
                "ownerId": 123,
                "clanName": "The Noobs",
                "players": ["NotTheBeast", "TheBeast420"]
            },
            {
                "_id": 2,
                "ownerId": 234,
                "clanName": "The Freaks",
                "players": ["BananaBob", "StrawberrySherry"]
            }
        ];

        factory.getClans = function(userId, callback) {
            var userClans = [];
            for (var i in factory.clans) {
                if (factory.clans[i].ownerId === userId) {
                    userClans.push(factory.clans[i]);
                }
            }
            callback(userClans);
        };

        factory.addClan = function(userId, clan, callback) {
            clan._id = (new Date).getTime();
            clan.ownerId = userId;

            factory.clans.push(clan);
            callback(clan);
        };

        factory.deleteClan = function(clanId, callback) {
            var newClans = [];
            for (var i in factory.clans) {
                if (factory.clans[i]._id !== clanId) {
                    newClans.push(factory.clans[i]);
                }
            }

            factory.clans = newClans;
            callback(newClans);
        };

        factory.updateClan = function(clanId, newClan, callback) {
            for (var i in factory.clans) {
                if (factory.clans[i]._id === clanId) {
                    factory.clans[i] = newClan;
                    callback(newClan);
                    return;
                }
            }
            callback(null);
        };

        return factory;
    }
})();

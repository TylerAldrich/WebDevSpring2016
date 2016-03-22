var clans = require("./clan.mock.json");
module.exports = function() {
    "use strict";
    var api = {
        createClan: createClan,
        deleteClan: deleteClan,
        updateClan: updateClan,
        findClan: findClan
    };
    return api;

    function createClan(userId, newClan) {
        newClan._id = (new Date).getTime();
        newClan.ownerId = userId;

        clans.push(newClan);
        return newClan;
    }

    function deleteClan(clanId) {
        var newClans = [];
        for (var i in clans) {
            if (clans[i]._id !== clanId) {
                newClans.push(clans[i]);
            }
        }

        clans = newClans;
        return clans;
    }

    function updateClan(clanId, newClan) {
        for (var i in clans) {
            if (clans[i]._id === clanId) {
                clans[i] = newClan;
                return newClan;
            }
        }
        return null;
    }

    function findClan(userId) {
        var userClans = [];
        for (var i in clans) {
            if (clans[i].ownerId === userId) {
                userClans.push(clans[i]);
            }
        }
        return userClans;
    }
};
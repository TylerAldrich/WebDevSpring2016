(function() {
    "use strict";
    angular
        .module('XPTrackerApp')
        .factory("GoalService", GoalService);

    function GoalService() {

        var factory = {};

        factory.goals = [
            {
                "_id": 0,
                "userId": 123,
                "playerName": "Lord Newb",
                "attack": 10000,
                "defense": 10000,
                "strength": 10000,
                "ranged": 10000,
                "magic": 10000,
                "prayer": 10000
            },
            {
                "_id": 1,
                "userId": 234,
                "playerName": "Bob123",
                "attack": 20000,
                "defense": 20000,
                "strength": 20000,
                "ranged": 20000,
                "magic": 20000,
                "prayer": 20000
            },
            {
                "_id": 2,
                "userId": 123,
                "playerName": "BestPlayer",
                "attack": 20000,
                "defense": 20000,
                "strength": 20000,
                "ranged": 20000,
                "magic": 20000,
                "prayer": 20000
            }
        ];

        factory.findPlayerGoal = function(playerName, callback) {
            for (var i in factory.goals) {
                if (factory.goals[i].playerName === playerName) {
                    callback(factory.goals[i]);
                    return;
                }
            }
            callback(null);
        };

        factory.findAllGoals = function(userId, callback) {
            var goals = [];
            for (var i in factory.goals) {
                if (factory.goals[i].userId === userId) {
                    goals.push(factory.goals[i]);
                }
            }
            callback(goals);
        };

        factory.createGoal = function(goal, callback) {
            goal._id = (new Date).getTime();
            factory.goals.push(goal);
            callback(goal);
        };

        factory.deleteGoalById = function(goalId, callback) {
            var newGoals = [];
            for (var i in factory.goals) {
                if (factory.goals[i]._id !== goalId) {
                    newGoals.push(factory.goals[i]);
                }
            }
            factory.goals = newGoals;
            callback(factory.goals);
        };

        factory.updateGoal = function(goalId, goal, callback) {
            for (var i in factory.goals) {
                if (factory.goals[i]._id === goalId) {
                    factory.goals[i] = goal;
                    callback(goal);
                    return;
                }
            }
            callback(null);
        };

        return factory;
    }
})();


var goals = require("./goal.mock.json");

module.exports = function() {
    "use strict";
    var api = {
        createGoal: createGoal,
        deleteGoal: deleteGoal,
        updateGoal: updateGoal,
        findAllGoals: findAllGoals,
        findPlayerGoal: findPlayerGoal
    };
    return api;

    function createGoal(userId, goal) {
        goal._id = (new Date).getTime();
        goal.userId = userId;
        goals.push(goal);
        return goal;
    }

    function deleteGoal(goalId) {
        var newGoals = [];
        for (var i in goals) {
            if (goals[i]._id !== goalId) {
                newGoals.push(goals[i]);
            }
        }
        goals = newGoals;
        return goals;
    }

    function updateGoal(goalId, goal) {
        for (var i in goals) {
            if (goals[i]._id === goalId) {
                goals[i] = goal;
                return goal;

            }
        }
        return null;
    }

    function findAllGoals(userId) {
        var foundGoals = [];
        for (var i in goals) {
            if (goals[i].userId === userId) {
                foundGoals.push(goals[i]);
            }
        }
        return foundGoals;
    }

    function findPlayerGoal(playerName) {
        for (var i in goals) {
            if (goals[i].playerName === playerName) {
                return goals[i];
            }
        }
        return null;
    }
};
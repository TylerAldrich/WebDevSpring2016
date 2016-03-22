(function() {
    "use strict";
    angular
        .module('XPTrackerApp')
        .factory("GoalService", GoalService);

    function GoalService($http) {

        var factory = {
            findPlayerGoal: findPlayerGoal,
            findAllGoals: findAllGoals,
            createGoal: createGoal,
            deleteGoalById: deleteGoalById,
            updateGoal: updateGoal
        };
        return factory;

        function findPlayerGoal(playerName) {
            return $http.get("/api/project/goal/" + playerName);
        }

        function findAllGoals(userId) {
            return $http.get("/api/project/user/" + userId + "/goal");
        }

        function createGoal(userId, goal) {
            return $http.post("/api/project/user/" + userId + "/goal", goal);
        }

        function deleteGoalById(goalId) {
            return $http.delete("/api/project/goal/" + goalId);
        }

        function updateGoal(goalId, goal) {
            return $http.put("/api/project/goal/" + goalId, goal);
        }
    }
})();


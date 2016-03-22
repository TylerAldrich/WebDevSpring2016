(function() {
    "use strict";
    angular
        .module('XPTrackerApp')
        .controller("GoalController", GoalController);

    function GoalController($scope, GoalService) {
        $scope.selectedIdx = null;

        GoalService.findAllGoals($scope.user._id, function(goals) {
            $scope.goals = goals;
        });

        $scope.addGoal = function() {
            var goal = {};
            goal.userId = $scope.user._id;
            goal.playerName = $scope.playerName;
            goal.attack = $scope.attack;
            goal.strength = $scope.strength;
            goal.defense = $scope.defense;
            goal.ranged = $scope.ranged;
            goal.magic = $scope.magic;
            goal.prayer = $scope.prayer;

            GoalService.createGoal(goal, function(newGoal) {
                $scope.goals.push(newGoal);
            });
        };

        $scope.deleteGoal = function(idx) {
            var goalId = $scope.goals[idx]._id;
            GoalService.deleteGoalById(goalId, function() {
                GoalService.findAllGoals($scope.user._id, function(goals) {
                    $scope.goals = goals;
                });
            });
        };

        $scope.selectGoal = function(idx) {
            $scope.selectedIdx = idx;
            $scope.playerName = $scope.goals[idx].playerName;
            $scope.attack = $scope.goals[idx].attack;
            $scope.defense = $scope.goals[idx].defense;
            $scope.strength = $scope.goals[idx].strength;
            $scope.magic = $scope.goals[idx].magic;
            $scope.ranged = $scope.goals[idx].ranged;
            $scope.prayer = $scope.goals[idx].prayer;
        };

        $scope.updateGoal = function() {
            if ($scope.selectedIdx === null) return;
            var goal = $scope.goals[$scope.selectedIdx];
            goal.playerName = $scope.playerName;
            goal.attack = $scope.attack;
            goal.strength = $scope.strength;
            goal.defense = $scope.defense;
            goal.ranged = $scope.ranged;
            goal.magic = $scope.magic;
            goal.prayer = $scope.prayer;

            GoalService.updateGoal(goal._id, goal, function(newGoal) {
                $scope.goals[$scope.selectedIdx] = newGoal;
            });
        };
    }
})();

module.exports = function(app, GoalModel) {
    "use strict";

    app.post('/api/project/user/:userId/goal', createGoal);
    app.get('/api/project/user/:userId/goal', findAllGoals);
    app.get('/api/project/following/:playerName', findPlayerGoal);
    app.put('/api/project/goal/:id', updateGoal);
    app.delete('/api/project/goal/:id', deleteGoal);

    function createGoal(req, res) {
        var userId = parseInt(req.params.userId);
        var newFollowing = GoalModel.createGoal(userId, req.body);
        res.json(newFollowing);
    }

    function findAllGoals(req, res) {
        var userId = parseInt(req.params.userId);
        var goals = GoalModel.findAllGoals(userId);
        res.json(goals);
    }

    function findPlayerGoal(req, res) {
        var goal = GoalModel.findPlayerGoal(req.params.playerName);
        res.json(goal);
    }

    function updateGoal(req, res) {
        var goalId = parseInt(req.params.id);
        var newGoal = GoalModel.updateGoal(goalId, req.body);
        res.json(newGoal);
    }

    function deleteGoal(req, res) {
        var goalId = parseInt(req.params.id);
        GoalModel.deleteGoal(goalId);
        res.send(200);
    }
};
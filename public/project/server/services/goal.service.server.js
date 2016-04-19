module.exports = function(app, GoalModel) {
    "use strict";

    app.post('/api/project/user/:userId/goal', createGoal);
    app.get('/api/project/user/:userId/goal', findAllGoals);
    app.get('/api/project/goal/:playerName', findPlayerGoal);
    app.put('/api/project/goal/:id', updateGoal);
    app.delete('/api/project/goal/:id', deleteGoal);

    function createGoal(req, res) {
        GoalModel.createGoal(req.params.userId, req.body).then(
            function(newGoal) {
                res.json(newGoal);
            }
        );
    }

    function findAllGoals(req, res) {
        GoalModel.findAllGoals(req.params.userId).then(
            function(goals) {
                res.json(goals);
            }
        );
    }

    function findPlayerGoal(req, res) {
        GoalModel.findPlayerGoal(req.params.playerName).then(
            function(goal) {
                res.json(goal);
            }
        );
    }

    function updateGoal(req, res) {
        GoalModel.updateGoal(req.params.id, req.body).then(
            function(newGoal) {
                res.json(newGoal);
            }
        );
    }

    function deleteGoal(req, res) {
        GoalModel.deleteGoal(req.params.id).then(
            function() {
                res.send(200);
            }
        );
    }
};
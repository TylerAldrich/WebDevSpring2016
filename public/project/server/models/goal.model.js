var q = require('q');

module.exports = function(mongoose) {
    "use strict";

    var GoalSchema = require("./goal.server.schema.js")(mongoose);
    var GoalModel = mongoose.model("GoalModel", GoalSchema);

    var api = {
        createGoal: createGoal,
        deleteGoal: deleteGoal,
        updateGoal: updateGoal,
        findAllGoals: findAllGoals,
        findPlayerGoal: findPlayerGoal
    };
    return api;

    function createGoal(userId, goal) {
        goal.userId = userId;
        var deferred = q.defer();
        GoalModel.create(goal,
            function(err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc);
                }
            }
        );
        return deferred.promise;
    }

    function deleteGoal(goalId) {
        var deferred = q.defer();
        GoalModel.remove({_id: goalId}, function(err, status) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(status);
            }
        });
        return deferred.promise;
    }

    function updateGoal(goalId, goal) {
        var deferred = q.defer();
        GoalModel.findById(goalId, function(err, doc) {
            var fields = Object.keys(goal);
            for (var i in fields) {
                doc[fields[i]] = goal[fields[i]];
            }

            doc.save(function(err, doc) {
                deferred.resolve(doc);
            });
        });
        return deferred.promise;
    }

    function findAllGoals(userId) {
        var deferred = q.defer();
        GoalModel.find({userId: userId}, function(err, goals) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(goals);
            }
        });
        return deferred.promise;
    }

    function findPlayerGoal(playerName) {
        var deferred = q.defer();
        GoalModel.find({playerName: playerName}, function(err, goals) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(goals);
            }
        });
        return deferred.promise;
    }
};
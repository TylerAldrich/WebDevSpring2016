module.exports = function(app, FollowingModel) {
    "use strict";

    app.post('/api/project/user/:userId/following', createFollowing);
    app.get('/api/project/user/:userId/following', findFollowing);
    app.put('/api/project/following/:id', updateFollowing);
    app.delete('/api/project/following/:id', deleteFollowing);

    function createFollowing(req, res) {
        FollowingModel.createFollowing(req.params.userId, req.body).then(
            function(newFollowing) {
                res.json(newFollowing);
            }
        );
    }

    function findFollowing(req, res) {
        FollowingModel.findFollowing(req.params.userId).then(
            function(following) {
                res.json(following);
            }
        );
    }

    function updateFollowing(req, res) {
        FollowingModel.updateFollowing(req.params.id, req.body).then(
            function(newFollowing) {
                res.json(newFollowing);
            }
        );
    }

    function deleteFollowing(req, res) {
        FollowingModel.deleteFollowing(req.params.id).then(
            function() {
                res.send(200);
            }
        );
    }
};
module.exports = function(app, FollowingModel) {
    "use strict";

    app.post('/api/project/user/:userId/following', createFollowing);
    app.get('/api/project/user/:userId/following', findFollowing);
    app.put('/api/project/following/:id', updateFollowing);
    app.delete('/api/project/following/:id', deleteFollowing);

    function createFollowing(req, res) {
        var userId = parseInt(req.params.userId);
        var newFollowing = FollowingModel.createFollowing(userId, req.body);
        res.json(newFollowing);
    }

    function findFollowing(req, res) {
        var userId = parseInt(req.params.userId);
        var following = FollowingModel.findFollowing(userId);
        res.json(following);
    }

    function updateFollowing(req, res) {
        var followingId = parseInt(req.params.id);
        var newFollowing = FollowingModel.updateFollowing(followingId, req.body);
        res.json(newFollowing);
    }

    function deleteFollowing(req, res) {
        var followingId = parseInt(req.params.id);
        FollowingModel.deleteFollowing(followingId);
        res.send(200);
    }
};
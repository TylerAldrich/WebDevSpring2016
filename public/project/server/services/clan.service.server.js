module.exports = function(app, ClanModel) {
    "use strict";
    app.post('/api/project/user/:userId/clan', createClan);
    app.get('/api/project/user/:userId/clan', findClan);
    app.put('/api/project/clan/:id', updateClan);
    app.delete('/api/project/clan/:id', deleteClan);

    function createClan(req, res) {
        var userId = parseInt(req.params.userId);
        var newFollowing = ClanModel.createClan(userId, req.body);
        res.json(newFollowing);
    }

    function findClan(req, res) {
        var userId = parseInt(req.params.userId);
        var following = ClanModel.findClan(userId);
        res.json(following);
    }

    function updateClan(req, res) {
        var clanId = parseInt(req.params.id);
        var newClan = ClanModel.updateClan(clanId, req.body);
        res.json(newClan);
    }

    function deleteClan(req, res) {
        var clanId = parseInt(req.params.id);
        ClanModel.deleteClan(clanId);
        res.send(200);
    }
};
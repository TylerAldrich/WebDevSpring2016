module.exports = function(app, ClanModel) {
    "use strict";
    app.post('/api/project/user/:userId/clan', createClan);
    app.get('/api/project/user/:userId/clan', findClan);
    app.put('/api/project/clan/:id', updateClan);
    app.delete('/api/project/clan/:id', deleteClan);

    function createClan(req, res) {
        ClanModel.createClan(req.params.userId, req.body).then(
            function(newClan) {
                res.json(newClan);
            }
        );
    }

    function findClan(req, res) {
        ClanModel.findClan(req.params.userId).then(
            function(clan) {
                res.json(clan);
            }
        );
    }

    function updateClan(req, res) {
        ClanModel.updateClan(req.params.id, req.body).then(
            function(newClan) {
                res.json(newClan);
            }
        );
    }

    function deleteClan(req, res) {
        ClanModel.deleteClan(req.params.id).then(
            function() {
                res.send(200);
            }
        );
    }
};
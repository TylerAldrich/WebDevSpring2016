module.exports = function(app, PlayerModel) {
    "use strict";

    app.post('/api/project/player', createPlayer);
    app.get('/api/project/user/:userId/player', findAllPlayers);
    app.get('/api/project/player/:name', findPlayer);
    app.put('/api/project/player/:id', updatePlayer);
    app.delete('/api/project/player/:id', deletePlayer);

    function createPlayer(req, res) {
        PlayerModel.createPlayer(req.body).then(
            function(newPlayer) {
                res.json(newPlayer);
            }
        );
    }

    function findAllPlayers(req, res) {
        PlayerModel.findAllPlayers(req.params.userId).then(
            function(players) {
                res.json(players);
            }
        );
    }

    function findPlayer(req, res) {
        PlayerModel.findPlayer(req.params.name).then(
            function(player) {
                res.json(player);
            }
        );
    }

    function updatePlayer(req, res) {
        PlayerModel.updatePlayer(req.params.id, req.body).then(
            function(newPlayer) {
                res.json(newPlayer);
            }
        );
    }

    function deletePlayer(req, res) {
        PlayerModel.deletePlayer(req.params.id).then(
            function() {
                res.send(200);
            }
        );
    }
};
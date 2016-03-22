module.exports = function(app, PlayerModel) {
    "use strict";

    app.post('/api/project/player', createPlayer);
    app.get('/api/project/user/:userid/player', findAllPlayers);
    app.get('/api/project/player/:name', findPlayer);
    app.put('/api/project/player/:id', updatePlayer);
    app.delete('/api/project/player/:id', deletePlayer);

    function createPlayer(req, res) {
        var newPlayer = PlayerModel.createPlayer(req.body);
        res.json(newPlayer);
    }

    function findAllPlayers(req, res) {
        var userId = parseInt(req.params.userid);
        var players = PlayerModel.findAllPlayers(userId);
        res.json(players);
    }

    function findPlayer(req, res) {
        var player = PlayerModel.findPlayer(req.params.name);
        res.json(player);
    }

    function updatePlayer(req, res) {
        var playerId = parseInt(req.params.id);
        var newPlayer = PlayerModel.updatePlayer(playerId, req.body);
        res.json(newPlayer);
    }

    function deletePlayer(req, res) {
        var playerId = parseInt(req.params.id);
        PlayerModel.deletePlayer(playerId);
        res.send(200);
    }
};
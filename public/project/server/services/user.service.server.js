module.exports = function(app, UserModel) {
    "use strict";

    app.post('/api/project/user', createUser);
    app.get('/api/project/user', findUsers);
    app.get('/api/project/user/:id', findUserById);
    app.put('/api/project/user/:id', updateUser);
    app.delete('/api/project/user/:id', deleteUser);

    function createUser(req, res) {
        var newUser = UserModel.createUser(req.body);
        res.json(newUser);
    }

    function findUsers(req, res) {
        if (req.query.username) {
            if (req.query.password) {
                findUserByCredentials(req, res);
            } else {
                findUserByUsername(req, res);
            }
        } else {
            var users = UserModel.findAllUsers();
            res.json(users);
        }
    }

    function findUserById(req, res) {
        var userId = parseInt(req.params.id);
        var user = UserModel.findUserById(userId);
        res.json(user);
    }

    function findUserByUsername(req, res) {
        var username = req.query.username;
        var user = UserModel.findUserByUsername(username);
        res.json(user);
    }

    function findUserByCredentials(req, res) {
        var credentials = {
            username: req.query.username,
            password: req.query.password
        };
        var user = UserModel.findUserByCredentials(credentials);
        res.json(user);
    }

    function updateUser(req, res) {
        var userId = parseInt(req.params.id);
        var newUser = UserModel.updateUser(userId, req.body);
        res.json(newUser);
    }

    function deleteUser(req, res) {
        var userId = parseInt(req.params.id);
        UserModel.deleteUser(userId);
        res.send(200);
    }
};
module.exports = function(app, UserModel) {
    "use strict";

    app.post('/api/assignment/user', createUser);
    app.get('/api/assignment/user', findUsers);
    app.get('/api/assignment/user/:id', findUserById);
    app.put('/api/assignment/user/:id', updateUser);
    app.delete('/api/assignment/user/:id', deleteUser);

    function createUser(req, res) {
        UserModel.createUser(req.body).then(
            function(newUser) {
                res.json(newUser);
            }
        );
    }

    function findUsers(req, res) {
        if (req.query.username) {
            if (req.query.password) {
                findUserByCredentials(req, res);
            } else {
                findUserByUsername(req, res);
            }
        } else {
            UserModel.findAllUsers().then(
                function(allUsers) {
                    res.json(allUsers);
                }
            );
        }
    }

    function findUserById(req, res) {
        UserModel.findUserById(req.params.id).then(
            function(user) {
                if (user.length > 0) {
                    res.json(user[0]);
                } else {
                    res.json(null);
                }
            }
        );
    }

    function findUserByUsername(req, res) {
        var username = req.query.username;
        UserModel.findUserByUsername(username).then(
            function(user) {
                if (user.length > 0) {
                    res.json(user[0]);
                } else {
                    res.json(null);
                }
            }
        );
    }

    function findUserByCredentials(req, res) {
        var credentials = {
            username: req.query.username,
            password: req.query.password
        };
        UserModel.findUserByCredentials(credentials).then(
            function(user) {
                if (user.length > 0) {
                    res.json(user[0]);
                } else {
                    res.json(null);
                }
            }
        );
    }

    function updateUser(req, res) {
        UserModel.updateUser(req.params.id, req.body).then(
            function(newUser) {
                res.json(newUser);
            }
        );
    }

    function deleteUser(req, res) {
        UserModel.deleteUser(req.params.id).then(
            function() {
                res.send(200);
            }
        );
    }
};
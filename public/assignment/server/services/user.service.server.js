module.exports = function(app, UserModel, passport, LocalStrategy) {
    "use strict";

    passport.use('assignment-local', new LocalStrategy(
        function(username, password, done) {
            UserModel.findUserByCredentials({
                username: username,
                password: password
            }).then(
                function(user) {
                    if (!user) { return done(null, false); }
                    return done(null, user);
                },
                function(err) {
                    if (err) { return done(err); }
                }
            );
        }
    ));

    app.post('/api/assignment/login', passport.authenticate('assignment-local'), login);
    app.post('/api/assignment/logout', logout);
    app.post('/api/assignment/register', register);
    app.get('/api/assignment/loggedin', loggedin);

    app.post('/api/assignment/user', createUser);
    app.get('/api/assignment/user', findUsers);
    app.get('/api/assignment/user/:id', findUserById);
    app.put('/api/assignment/user/:id', updateUser);
    app.delete('/api/assignment/user/:id', deleteUser);

    app.post('/api/assignment/admin/user', isAdmin, createUser);
    app.get('/api/assignment/admin/user', isAdmin, findUsers);
    app.get('/api/assignment/admin/user/:id', isAdmin, findUserById);
    app.put('/api/assignment/admin/user/:id', isAdmin, updateUser);
    app.delete('/api/assignment/admin/user/:id', isAdmin, deleteUser);

    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        UserModel.findUserById(user._id).then(
            function(user) {
                done(null, user);
            },
            function(err) {
                done(err, null);
            }
        )
    }

    function authenticated(req, res, next) {
        if (!req.isAuthenticated()) {
            res.send(401);
        } else {
            next();
        }
    }

    function isAdmin(req, res, next) {
        if (!req.isAuthenticated() || req.user.roles.indexOf('admin') === -1) {
            res.send(403);
        } else {
            next();
        }
    }

    function login(req, res) {
        var user = req.user;
        res.json(user);
    }

    function logout(req, res) {
        req.logOut();
        res.send(200);
    }

    function loggedin(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }

    function register(req, res) {
        UserModel.findUserByCredentials(req.body).then(
            function(user) {
                if (user) {
                    res.send(400); // user already exists
                } else {
                    createUser(req, res);
                }
            }, function(err) {
                res.send(500);
            }
        )
    }

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
                if (user) {
                    res.json(user);
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
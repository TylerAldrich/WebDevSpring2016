module.exports = function(app, UserModel, passport, LocalStrategy) {
    "use strict";

    passport.use('project-local', new LocalStrategy(
        function(username, password, done){
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

    function login(req, res) {
        var user = req.user;
        res.json(user);
    }

    function loggedIn(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }

    function logout(req, res) {
        req.logOut();
        res.send(200);
    }

    function register(req, res) {
        UserModel.findUserByCredentials(req.body).then(
            function(user) {
                if (user) {
                    res.send(400); // user already exists
                } else {
                    createUser(req, res);
                }
            }, function() {
                res.send(500);
            }
        )
    }

    function isAdmin(req, res, next) {
        if (!req.isAuthenticated() || !req.user.isAdmin) {
            res.send(403);
        } else {
            next();
        }
    }

    app.post('/api/project/login', passport.authenticate('project-local'), login);
    app.get('/api/project/loggedin', loggedIn);
    app.post('/api/project/logout', logout);
    app.post('/api/project/register', register);

    app.post('/api/project/user', createUser);
    app.get('/api/project/user', findUsers);
    app.get('/api/project/user/:id', findUserById);
    app.put('/api/project/user/:id', updateUser);
    app.delete('/api/project/user/:id', deleteUser);

    app.post('/api/project/admin/user', isAdmin, createUser);
    app.get('/api/project/admin/user', isAdmin,findUsers);
    app.get('/api/project/admin/user/:id', isAdmin, findUserById);
    app.put('/api/project/admin/user/:id', isAdmin, updateUser);
    app.delete('/api/project/admin/user/:id', isAdmin, deleteUser);

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
                res.json(user);
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
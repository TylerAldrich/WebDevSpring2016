module.exports = function(app, UserModel, passport, LocalStrategy) {
    "use strict";

    passport.use('project-local', new LocalStrategy(
        function(username, password, done){
            var user = UserModel.findUserByCredentials({
                username: username,
                password: password
            });
            if (user !== null) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        }
    ));


    passport.serializeUser(function(user, done)
    {
        done(null, user);
    });

    passport.deserializeUser(function(user, done)
    {
        var user = UserModel.findUserById(user._id);
        done(null, user);
    });

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
        var newUser = UserModel.createUser(req.body);
        req.login(newUser, function(err) {
            if (err) {return next(err);}
            res.json(newUser);
        });
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
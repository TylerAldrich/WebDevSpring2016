var users = require("./user.mock.json");

module.exports = function(app) {
    "use strict";
    var api = {
        createUser: createUser,
        findAllUsers: findAllUsers,
        findUserById: findUserById,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials,
        updateUser: updateUser,
        deleteUser: deleteUser
    };
    return api;

    function createUser(user) {
        user._id = (new Date).getTime();
        users.push(user);
    }

    function findAllUsers() {
        return users;
    }

    function findUserById(userId) {
        for (var i in users) {
            if (users[i]._id === userId) {
                return users[i];
            }
        }
        return null;
    }

    function findUserByUsername(username) {
        for (var i in users) {
            if (users[i].username === username) {
                return users[i];
            }
        }
        return null;
    }

    function findUserByCredentials(credentials) {
        for (var i in users) {
            if (users[i].username === credentials.username &&
                users[i].password === credentials.password) {
                return users[i];
            }
        }
        return null;
    }

    function updateUser(userId, user) {
        for (var i in users) {
            if (users[i]._id === userId) {
                users[i] = user;
                return users[i];
            }
        }
        return null;
    }

    function deleteUser(userId) {
        var newUsers = [];
        for (var i in users) {
            if (users[i]._id !== userId) {
                newUsers.push(users[i]);
            }
        }
        users = newUsers;
    }
};
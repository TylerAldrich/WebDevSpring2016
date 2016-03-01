(function() {
    "use strict";
    angular
        .module('FormBuilderApp')
        .factory("UserService", UserService);

    function UserService() {

        var factory = {};

        factory.users = [
            {        "_id":123, "firstName":"Alice",            "lastName":"Wonderland",
                "username":"alice",  "password":"alice",   "roles": ["student"]                },
            {        "_id":234, "firstName":"Bob",              "lastName":"Hope",
                "username":"bob",    "password":"bob",     "roles": ["admin"]                },
            {        "_id":345, "firstName":"Charlie",          "lastName":"Brown",
                "username":"charlie","password":"charlie", "roles": ["faculty"]                },
            {        "_id":456, "firstName":"Dan",              "lastName":"Craig",
                "username":"dan",    "password":"dan",     "roles": ["faculty", "admin"]},
            {        "_id":567, "firstName":"Edward",           "lastName":"Norton",
                "username":"ed",     "password":"ed",      "roles": ["student"]                }
        ];

        factory.findUserByUsernameAndPassword = function(username, password, callback) {
            for (var i in factory.users) {
                if (factory.users[i].username === username && factory.users[i].password === password) {
                    callback(factory.users[i]);
                    return;
                }
            }
            callback(null);
        };

        factory.findUserByUsername = function(username, callback) {
            for (var i in factory.users) {
                if (factory.users[i].username === username) {
                    callback(factory.users[i]);
                    return;
                }
            }
            callback(null);
        };

        factory.findAllUsers = function(callback) {
            callback(factory.users);
        };

        factory.createUser = function(user, callback) {
            user._id = (new Date).getTime();
            factory.users.push(user);
            callback(user);
        };

        factory.deleteUserById = function(userId, callback) {
            var newUsers = [];
            for (var i in factory.users) {
                if (factory.users[i]._id !== userId) {
                    newUsers.push(users[i]);
                }
            }
            factory.users = newUsers;
            callback(factory.users);
        };

        factory.updateUser = function(userId, user, callback) {
            for (var i in factory.users) {
                if (factory.users[i]._id === userId) {
                    factory.users[i] = user;
                    callback(user);
                    return;
                }
            }
            callback(null);
        };

        return factory;
    }
})();


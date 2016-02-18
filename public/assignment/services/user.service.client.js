(function() {
    "use strict";
    angular
        .module('FormBuilderApp')
        .factory("UserService", UserService);

    function UserService() {

        var users = [];
        users = [
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

        var factory = {};
        factory.findUserByUsernameAndPassword = function(username, password, callback) {
            for (i in users) {
                if (users[i].username === username && users[i].password === password) {
                    callback(users[i]);
                }
            }
            callback(null);
        };

        factory.findAllUsers = function(callback) {
            callback(users);
        };

        factory.createUser = function(user, callback) {
            user._id = (new Date).getTime();
            users.append(user);
            callback(user);
        };

        factory.deleteUserById = function(userId, callback) {
            var newUsers = [];
            for (i in users) {
                if (users[i]._id !== userId) {
                    newUsers.append(users[i]);
                }
            }
            users = newUsers;
            callback(users);
        };

        factory.updateUser = function(userId, user, callback) {
            for (i in users) {
                if (users[i]._id === userId) {
                    users[i] = user;
                    callback(user);
                }
            }
            callback(null);
        };

        return factory;
    }
})();


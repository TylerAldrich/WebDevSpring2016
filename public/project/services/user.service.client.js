(function() {
    "use strict";
    angular
        .module('XPTrackerApp')
        .factory("UserService", UserService);

    function UserService() {

        var factory = {};

        // ClanService contains info about specific clans, GoalService about all goals
        factory.users = [
            {
                "_id": 123,
                "username":"Tyler",
                "password":"1234",
                "email": "aldrich.ty@husky.neu.edu",
                "rsAccounts": ["Lord Newb", "Ninjalemon"],
                "clans": ["Foo"]
            },
            {
                "_id": 234,
                "username":"bob",
                "password":"12345",
                "email": "bob123@bob.com",
                "rsAccounts": ["BobIsTheBest"],
                "clans": ["Bar"]
            }
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
                    newUsers.push(factory.users[i]);
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


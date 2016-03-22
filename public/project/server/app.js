module.exports = function(app) {
    "use strict";
    var UserModel = require("./models/user.model.js")();
    require("./services/user.service.server.js")(app, UserModel);
};
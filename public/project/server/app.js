module.exports = function(app) {
    "use strict";
    var UserModel = require("./models/user.model.js")();
    var PlayerModel = require("./models/player.model.js")();
    var FollowingModel = require("./models/following.model.js")();
    require("./services/user.service.server.js")(app, UserModel);
    require("./services/player.service.server.js")(app, PlayerModel);
    require("./services/following.service.server.js")(app, FollowingModel);
};
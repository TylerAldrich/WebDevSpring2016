module.exports = function(app, passport, LocalStrategy) {
    "use strict";
    var UserModel = require("./models/user.model.js")();
    var PlayerModel = require("./models/player.model.js")();
    var FollowingModel = require("./models/following.model.js")();
    var ClanModel = require("./models/clan.model.js")();
    var GoalModel = require("./models/goal.model.js")();
    require("./services/user.service.server.js")(app, UserModel, passport, LocalStrategy);
    require("./services/player.service.server.js")(app, PlayerModel);
    require("./services/following.service.server.js")(app, FollowingModel);
    require("./services/clan.service.server.js")(app, ClanModel);
    require("./services/goal.service.server.js")(app, GoalModel);
};
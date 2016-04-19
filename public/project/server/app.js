module.exports = function(app, passport, LocalStrategy, mongoose) {
    "use strict";
    var UserModel = require("./models/user.model.js")(mongoose);
    var PlayerModel = require("./models/player.model.js")(mongoose);
    var FollowingModel = require("./models/following.model.js")(mongoose);
    var ClanModel = require("./models/clan.model.js")(mongoose);
    var GoalModel = require("./models/goal.model.js")(mongoose);
    require("./services/user.service.server.js")(app, UserModel, passport, LocalStrategy);
    require("./services/player.service.server.js")(app, PlayerModel);
    require("./services/following.service.server.js")(app, FollowingModel);
    require("./services/clan.service.server.js")(app, ClanModel);
    require("./services/goal.service.server.js")(app, GoalModel);
};
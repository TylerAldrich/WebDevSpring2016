module.exports = function(app, mongoose, db) {
    "use strict";
    var UserModel = require("./models/user.model.js")(mongoose);
    var FormModel = require("./models/form.model.js")(mongoose);
    var FieldModel = require("./models/field.model.js")(mongoose, FormModel);
    require("./services/user.service.server.js")(app, UserModel);
    require("./services/form.service.server.js")(app, FormModel);
    require("./services/field.service.server.js")(app, FieldModel);
};
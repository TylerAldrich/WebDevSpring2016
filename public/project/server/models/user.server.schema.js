module.exports = function(mongoose) {
    var UserSchema = mongoose.Schema({
        username: String,
        password: String,
        email: String,
        rsAccounts: [String],
        clans: [String],
        isAdmin: Boolean
    }, {collection: "users"});
    return UserSchema;
};
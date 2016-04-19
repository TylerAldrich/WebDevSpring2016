module.exports = function(mongoose) {
    var FollowingSchema = mongoose.Schema({
        userId: String,
        username: String
    }, {collection: "following"});
    return FollowingSchema;
};
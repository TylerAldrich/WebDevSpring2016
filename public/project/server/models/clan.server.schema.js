module.exports = function(mongoose) {
    var ClanSchema = mongoose.Schema({
        ownerId: String,
        clanName: String,
        players: [String]
    }, {collection: "clans"});
    return ClanSchema;
};
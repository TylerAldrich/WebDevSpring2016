module.exports = function(mongoose) {
    var PlayerSchema = mongoose.Schema({
        userId: String,
        playerName: String,
        attack: Number,
        defense: Number,
        strength: Number,
        ranged: Number,
        magic: Number,
        prayer: Number,
        date: Date
    }, {collection: "players"});
    return PlayerSchema;
};
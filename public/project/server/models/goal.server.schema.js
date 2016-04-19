module.exports = function(mongoose) {
    var GoalSchema = mongoose.Schema({
        userId: String,
        playerName: String,
        attack: Number,
        defense: Number,
        strength: Number,
        ranged: Number,
        magic: Number,
        prayer: Number
    }, {collection: "goals"});
    return GoalSchema;
};
var mongoose = require('mongoose'), 
    Schema = mongoose.Schema;

var game = Schema({
	Name: String,
	MinPlayers: Number,
	MaxPlayers: Number,
	RecommendedPlayer: String,
	Thumbnail: String,
	PlayTime: Number,
	BoardGameGeekID: Number,
	Quantity: Number,
	Available: Number
});

module.exports = mongoose.model('game', game);
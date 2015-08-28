var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var order = Schema({
	User: "String",
	Game: { type: Schema.Types.ObjectId, ref: 'game' },
	CheckOutDate: { type: Date, default: Date.now },
	ReturnDate: {type: Date, default: Date.now + Date.now.addDays(7)}
});

module.exports = mongoose.model('order', order);
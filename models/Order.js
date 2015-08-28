var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var order = Schema({
	User: "String",
	Game: { type: Schema.Types.ObjectId, ref: 'game' },
	CheckOutDate: { type: Date, default: Date.now },
	ReturnDate: {type: Date, default: new Date(+new Date() + 7*24*60*60*1000)}
});

module.exports = mongoose.model('order', order);
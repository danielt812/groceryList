const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	active: {
		type: Boolean,
		required: true,
		default: false
	},
	date: {
		type: Date,
		default: Date.now
	}
});

module.exports = Item = mongoose.model('item', itemSchema);

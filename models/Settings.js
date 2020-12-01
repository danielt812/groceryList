const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const settingsSchema = new Schema({
	sort: {
		type: String,
		required: true,
		default: 'Name'
	}
});

module.exports = Settings = mongoose.model('settings', settingsSchema);

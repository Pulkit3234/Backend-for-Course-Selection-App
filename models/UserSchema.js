const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const SubjectSchema = new Schema({
	id: String,
	name: String,
	description: String,
	credits: Number,
});

const UserSchema = new Schema({
	name: { type: String, required: true },
	email: { type: String, required: true },
	password: { type: String, required: true },
	subjects: [SubjectSchema],
	register: { type: Boolean, default: false },
	credits: { type: Number, default: 15 },
});

module.exports = mongoose.model('User', UserSchema);

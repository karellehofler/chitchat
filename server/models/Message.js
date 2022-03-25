const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    message: { type: String, required: true },
    time: { type: Date, default: Date.now },
    username: { type: String, required: true },
});

module.exports = Message = mongoose.model('message', MessageSchema);
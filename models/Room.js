const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RoomSchema = new Schema({
    created_by: { type: String, required: true },
    owner: { type: String, required: true },
    is_public: { type: Boolean, required: true }
});

module.exports = Room = mongoose.model('room', RoomSchema);
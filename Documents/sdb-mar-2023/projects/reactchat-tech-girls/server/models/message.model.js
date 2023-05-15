const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
    when: {
        type: String,
        default: Date.now(),
        required: true,
    },
    user: {
        type: String,
        required: true,
    },
    room: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,

    },
    room_id: { type: mongoose.Types.ObjectId, ref: "Room" },

});

module.exports = mongoose.model("Message", MessageSchema);
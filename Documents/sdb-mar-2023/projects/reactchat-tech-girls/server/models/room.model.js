const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type:String,
        required: true,
    },
    addedUsers: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },

});

module.exports = mongoose.model("Room", roomSchema);
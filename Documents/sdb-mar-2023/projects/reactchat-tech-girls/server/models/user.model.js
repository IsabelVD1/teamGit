const mongoose = require("mongoose");

//fistname, lastname, email, password
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        // required: true,

    },
    lastName: {
        type: String,
        //required: true,
        
    },
    email: {
        type: String,
        required: true,
        unique: true,

    },
    password: {
        type: String,
        required: true,
    },
     isAdmin: {
        type: Boolean,
        //default: false,
        required: true,
     },

});

module.exports = mongoose.model("User", userSchema);
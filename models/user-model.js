const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username: {
        type:String,
        required: true,
        trim: true
    },
    googleId: {
        type:String,
        required:true
    }
});

const User = mongoose.model("users", userSchema);
module.exports = User;

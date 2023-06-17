const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  googleId: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ["Lawyer", "General", "Admin"],
    required: true,
  },
  posts: [
    {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "posts",
      },
    },
  ],
  associates: [
    {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"users"
      },
    },
  ],
  institutions: [
    {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"institutions"
      },
    },
  ],
  creationTimestamp: {
    type: Date,
    default: Date.now(),
  },
});

const User = mongoose.model("users", userSchema);
module.exports = User;

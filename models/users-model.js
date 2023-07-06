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
    enum: ["lawyer", "general", "admin"],
    default: "general",
  },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "posts",
    },
  ],
  requestsRecieved: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  ],
  requestsSent: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  ],
  associates: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  ],
  institutions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "institutions",
    },
  ],
  postLikes:[
    {
      type: mongoose.Schema.Types.ObjectId,
    }
  ],
  postDislikes:[
    {
      type: mongoose.Schema.Types.ObjectId,
    }
  ],
  commentLikes:[
    {
      type: mongoose.Schema.Types.ObjectId,
    }
  ],
  commentDislikes:[
    {
      type: mongoose.Schema.Types.ObjectId,
    }
  ],
  creationTimestamp: {
    type: Date,
    default: Date.now(),
  },
});

const User = mongoose.model("users", userSchema);
module.exports = User;

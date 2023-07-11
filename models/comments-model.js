const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  parent: {                       
    type: Object,
    parentId: {
      type: mongoose.Schema.Types.ObjectId,
    },
    status: {
      type: String,
      enum: ["post", "comment"],
    },
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "comments",
    },
  ],
  dislikes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  ],
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  ],
  creationTimestamp: {
    type: Date,
    default: Date.now(),
  },
});

const Comment = mongoose.model("comments", commentSchema);
module.exports = Comment;

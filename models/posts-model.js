const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  attatchments: [
    {
      url: {
        type: String,
      },
    },
  ],
  content: {
    type: String,
    required: true,
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref:"comments"
    },
  ],
  dislikes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref:"users"
    }
  ],
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref:"users"
    }
  ],
  creationTimestamp: {
    type: Date,
    default: Date.now(),
  },
});

const Post = mongoose.model("posts", postSchema);
module.exports = Post;

const Comment = require("../models/comments-model");
const handleError = require("../functions/handleError");
const Post = require("../models/posts-model");
const User = require("../models/users-model");
var mongoose = require("mongoose");
// routes comments/add/:id?status=post Create a comment on post
// routes comments/add/:id?status=comment Create a thread on comment

const createComment = async (req, res) => {
  try {
    const user = req.user;
    const { status,content } = req.body;
    const id = req.params.id;

    const newComment = await Comment.create({
      author: mongoose.Types.ObjectId(user.id),
      content,
      parent:{
        parentId : id,
        status 
      }
    });

    await User.findOneAndUpdate(
      { _id: user.id },
      {
        $push: {
          comments: newComment.id,
        },
      }
    );

    if (status == "post") {
      await Post.findOneAndUpdate(
        { _id: id },
        {
          $push: {
            comments: newComment.id,
          },
        }
      );
    } else if (status == "comment") {
      await Comment.findOneAndUpdate(
        { _id: id },
        {
          $push: {
            comments: newComment.id,
          },
        }
      );
    }
    res.json({ comment: newComment });
  } catch (error) {
    handleError(res, error);
  }
};

// routes comments/delete/:idComment/:parentId?status=post Remove Comment from the post
// routes comments/delete/:idComment/:parentId?status=comment Remove Comment from Comment (Thread)
const deleteComment = async (req, res) => {
  try {
    const user = req.user;
    const idComment = req.params.id;
    const {parentId , status} = (await Comment.findById(idComment)).parent;
    console.log(parentId)

    await User.findOneAndUpdate(
      { _id: user.id },
      {
        $pull: {
          comments: idComment,
        },
      }
    );
    if (status == "post") {
      await Post.findOneAndUpdate(
        { _id: parentId },
        {
          $pull: {
            comments: idComment,
          },
        }
      );
    } else if (status == "comment") {
      await Comment.findOneAndUpdate(
        { _id: parentId },
        {
          $pull: {
            comments: idComment,
          },
        }
      );

    }
      await Comment.findOneAndDelete(
        { _id : idComment}
      )
    res.json({ msg: "Comment removed successfully" });
  } catch (error) {
    handleError(res, error);
  }
};

const findComment = async (req, res) => {
  try {
    const comment = await Comment.findById({ _id: req.params.id });
    res.json({ comment });
  } catch (error) {
    handleError(res, error);
  }
};

module.exports = { createComment, findComment, deleteComment };

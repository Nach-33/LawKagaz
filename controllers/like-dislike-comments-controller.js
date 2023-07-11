const User = require("../models/users-model");
const Comments = require("../models/comments-model");
const handleError = require("../functions/handleError");

// routes comments/vode/:id?status=Like Like on Comment
// routes comments/vode/:id?status=disLike disLike on Comment

const commentsLikeDislike = async (req, res) => {
  const id = req.params.id;
  const user = req.user;
  const { status } = req.body;
  const task = await Comments.findById({ _id: id });
  if (status == "like") {
    try {
      await Comments.findOneAndUpdate(
        { _id: id },
        {
          $push: {
            likes: user.id,
          },
        },
        { new: true }
      );
      await User.findOneAndUpdate(
        { _id: user.id },
        {
          $push: {
            commentLikes: id,
          },
        }
      );
      res.json({ Likes: task.likes.length });
    } catch (error) {
      handleError(res, error);
    }
  } else if (status == "dislike") {
    try {
      await Comments.findOneAndUpdate(
        { _id: id },
        {
          $push: {
            dislikes: user.id,
          },
        }
      );
      await User.findOneAndUpdate(
        { _id: user.id },
        {
          $push: {
            commentDislikes: id,
          },
        }
      );
      res.json({ dislikes: task.dislikes.length });
    } catch (error) {
      handleError(res, error);
    }
  }
};

module.exports = { commentsLikeDislike };

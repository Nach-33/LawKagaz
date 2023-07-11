const router = require("express").Router();

const {
  commentsLikeDislike,
} = require("../controllers/like-dislike-comments-controller");
const {
  postComment,
  findComment,
  deleteComment,
} = require("../controllers/comments-controller");

//  route: /vote/:id    respone: Number of likes and dislikes on the comment

router.post("/vote/:id", commentsLikeDislike);

router.post("/:id", postComment);

router.get("/:id", findComment);

router.delete("/:id", deleteComment);

module.exports = router;

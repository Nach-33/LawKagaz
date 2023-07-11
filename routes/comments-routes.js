const router = require("express").Router();

const {
  commentsLikeDislike,
} = require("../controllers/like-dislike-comments-controller");
const {
  createComment,
  findComment,
  deleteComment,
} = require("../controllers/comments-controller");

//  route: /vote/:id    respone: Number of likes and dislikes on the comment

router.post("/vote/:id", commentsLikeDislike);

// id is id of the parent
router.post("/:id", createComment);

router.get("/:id", findComment);

router.delete("/:id", deleteComment);

module.exports = router;

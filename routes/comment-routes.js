const router = require("express").Router();

const {commentsLikeDislike}=require("../controllers/like-dislike-comments-controller")

//  route: /vote/:id    respone: Number of likes and dislikes on the comment
router.get("/vote/:id",commentsLikeDislike);

module.exports = router;

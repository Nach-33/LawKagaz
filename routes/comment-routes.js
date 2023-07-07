const router = require("express").Router();

const {commentsLikeDislike}=require("../controllers/like-dislike-comments-controller")
const {postComment, findComment, deleteComment}=require("../controllers/comment-controller")

//  route: /vote/:id    respone: Number of likes and dislikes on the comment

router.get("/vote/:id",commentsLikeDislike);

router.post("/add/:id",postComment)

router.get("/find/:id",findComment)

router.post("/deletecomment/:idc/:idp",deleteComment)

module.exports = router;

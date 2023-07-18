const router = require("express").Router();

const { getAllPosts, getPostById, createNewPost, deletePost } = require("../controllers/posts-controllers");
const {postLikeDislike}=require("../controllers/like-dislike-posts-controller")


//  route: /posts/all    respone: All posts from DB
router.get("/", getAllPosts)

//  route: /posts/find/{id}?field=post    response: Get post with the id
//  route: /posts/find/{id}?field=user    response: Get posts of user with id
router.get("/:id", getPostById);

//  route: /posts/create    response: Create a new post
router.post("/", createNewPost);

//  route: /posts/delete    response: Delete a new post
router.delete("/:id", deletePost);

//  route: /vote/:id    respone: Number of likes and dislikes on the post
router.post("/vote/:id",postLikeDislike);

module.exports = router;

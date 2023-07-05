const router = require("express").Router();

const { getAllPosts, getPostById, createNewPost, deletePost } = require("../controllers/posts");


//  route: /posts/all    respone: All posts from DB
router.get("/all", getAllPosts)

//  route: /posts/find/{id}?field=post    response: Get post with the id
//  route: /posts/find/{id}?field=user    response: Get posts of user with id
router.get("/find/:id", getPostById);

//  route: /posts/create    response: Create a new post
router.post("/create", createNewPost);

//  route: /posts/delete    response: Delete a new post
router.delete("/delete/:id", deletePost);

module.exports = router;

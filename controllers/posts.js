const Post = require("../models/posts-model");
const User = require("../models/users-model");
const handleError = require("../functions/handleError");

//  route: /posts/all    respone: All posts from DB
const getAllPosts = async (req, res) => {
    try {
        const postsList = await Post.find();
        res.json({ message: "Posts fetched successfully", posts: postsList });
    } catch (error) {
        handleError(res, error);
    }
}
//  route: /posts/find/{id}?field=post    response: Get post with the id
//  route: /posts/find/{id}?field=user    response: Get posts of user with id
const getPostById = async (req, res) => {
    const id = req.params.id;
    const field = req.query.field;
    try {

        if (field === "post") {
            const post = await Post.findById(id);

            if (!post) res.json({ message: "No posts found" });

            res.json({ message: "Posts fetched successfully", post });


        } else if (field === "user") {
            const userPostsList = await Post.find({ author: id });

            if (userPostsList === []) res.json({ message: "No posts found" });
            res.json({
                message: "Posts fetched successfully",
                posts: userPostsList,
            });
        } else res.status(404).json({ message: "No such field exists" });
    } catch (error) {
        handleError(res, error);
    }
}

//  route: /posts/create    response: Create a new post
const createNewPost = async (req, res) => {
    const postDetails = req.body;
    const user = req.user;

    try {
        postDetails.author = user.id;
        const newPost = await Post.create(postDetails);
        await User.findOneAndUpdate(
            { _id: user.id },
            {
                $push: {
                    posts: newPost.id,
                },
            }
        );
        res.json({ message: "Post created successfully", post: newPost });
    } catch (error) {
        handleError(res, error);
    }
}

//  route: /posts/delete    response: Delete a new post
const deletePost = async (req, res) => {
    const id = req.params.id;
    const user = req.user;
    try {
        await User.findOneAndUpdate(
            { _id: user.id },
            {
                $pull: {
                    posts: id,
                },
            }
        );
        const post = await Post.findByIdAndDelete(id);
        if (post) res.json({ message: " Post deleted successfully" });
        else res.json({ message: "No such post exists" });
    } catch (error) {
        handleError(res, error);
    }

}



module.exports = { getAllPosts, getPostById, createNewPost, deletePost }
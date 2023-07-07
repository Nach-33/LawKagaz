const Post = require("../models/posts-model");
const User = require("../models/users-model");
const Comments = require("../models/comments-model");
const handleError = require("../functions/handleError");

//  route: /posts/vote/:id?status=like response:Number of likes on post
//  route: /posts/vote/:id?status=dislike response:Number of Dislikes on post
const postLikeDislike=async(req,res)=>{
    const user=req.user;
    const status=req.query.status;
    const id=req.params.id;
    const task=await Post.findById({_id:id})
    console.log(user,"\n",status,"\n",id,"\n",task)
    if(status=="like"){
        try {
            await Post.findOneAndUpdate(
                { _id: id },
                {
                    $push: {
                        likes: user.id,
                    },
                },
                {new:true}
            );
            await User.findOneAndUpdate(
                { _id: user.id },
                {
                    $push: {
                        postLikes: id,
                    },
                }
            );
            res.json({Likes:task.likes.length})
        } catch (error) {
            handleError(res, error);
        }
        
    }else if(status=="dislike"){
        try {
            await Post.findOneAndUpdate(
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
                        postDislikes: id,
                    },
                }
            );
            res.json({dislikes:task.dislikes.length})
        }catch (error) {
            handleError(res, error);
        }
    }
}



module.exports = { postLikeDislike }
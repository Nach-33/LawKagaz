// const Post = require("../models/posts-model");
// const User = require("../models/users-model");
// const Comments = require("../models/comments-model");
// const handleError = require("../functions/handleError");

// // work to be completed

// const commentsLikeDislike=async(req,res)=>{
//     const user=req.user;
//     const status=req.query.status;
//     const id=req.params.id;
//     const task=await Comments.findById({_id:id})
//     console.log(user,"\n",status,"\n",id,"\n",task)
//     if(status=="like"){
//         try {
//             const waits=await Comments.findOneAndUpdate(
//                 { _id: id },
//                 {
//                     $push: {
//                         likes: user.id,
//                     },
//                 },
//                 {new:true}
//             );
//             await User.findOneAndUpdate(
//                 { _id: user.id },
//                 {
//                     $push: {
//                         commentLikes: id,
//                     },
//                 }
//             );
//             res.json({Likes:task.likes.length})
//         } catch (error) {
//             handleError(res, error);
//         }
        
//     }else if(status=="dislike"){
//         try {
//             await Comments.findOneAndUpdate(
//                 { _id: id },
//                 {
//                     $push: {
//                         dislikes: user.id,
//                     },
//                 }
//             );
//             await User.findOneAndUpdate(
//                 { _id: user.id },
//                 {
//                     $push: {
//                         commentDislikes: id,
//                     },
//                 }
//             );
//             res.json({dislikes:task.dislikes.length})
//         }catch (error) {
//             handleError(res, error);
//         }
//     }
// }



// module.exports = { commentsLikeDislike }
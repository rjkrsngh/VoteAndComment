'use strict';

const express = require('express');
const { default: mongoose } = require('mongoose');
const router = express.Router();

//Get all required db models
const Profile = mongoose.model('Profile');
const Comment = mongoose.model('Comment');

const handlePostCommentOnProfileReq = async (req, res, next) => {
    console.log('post comment req received!');

    const {profileId, commentedBy, commentTitle, commentText,
           mbti, ennegram, zodiac, likes} = req.body;


    // console.log("attributes in request");
    // console.log(`profileId: ${profileId}, commentTitle: ${commentTitle}, commentText: ${commentText}}
    //             mbti: ${mbti}, ennegram: ${ennegram}, likes: ${likes}`);

    //Insert in comment document, get the ObjId of the newly added comment &
    //push it to comment array in Profile document
    const comment = new Comment({
        profileId, commentedBy, commentTitle,
        commentText, mbti, ennegram, zodiac, likes
    });

    console.log(comment);

    await comment.save().then((newComment)=>{
        //comment added to db, now add this comment id to comment array in the profile model
        
        Profile.findByIdAndUpdate(profileId, {
            $push: {
                comments : newComment._id
            }
        }, (err, added)=>{
            if(!err){
                console.log("added comment id to profile array");
                res.status(200).json({
                    message: "comment posted successfully"
                });
            }
        })
    }).catch((error)=>{
        console.log("Error adding comment, eror", error);

        res.status(500).json({
            message: "could not post comment"
        });
    });

}

const handleCommentLikeRequest = async (req, res, next) => {
    const commentId = req.params.comment_id;

    console.log(`received request: comment/like/${commentId}`);

    let found = await Comment.findById(commentId).exec();

    found.likes += 1;
    await found.save()
    .then((result)=>{
        if(result){
            console.log("Post liked!");

            res.status(200).json({
                message: "Post liked",
                current_likes: result.likes
            });
        }
        else{
            console.log("Error liking post ->", err);

            res.status(500).json({
                message: "Error liking post"
            });
        }
    });
}

const handleCommentUnlikeRequest = async (req, res, next) => {
    const commentId = req.params.comment_id;

    let found = await Comment.findById(commentId).exec();

    found.likes -= 1;
    await found.save()
    .then((result)=>{
        if(result){
            console.log("Post unliked!");

            res.status(200).json({
                message: "Post unliked",
                current_likes: result.likes
            });
        }
        else{
            console.log("Error unliking post ->", err);

            res.status(500).json({
                message: "Error unliking post"
            });
        }
    });
}

//add APIs and their handler methods
router.post('/comment/create', handlePostCommentOnProfileReq);
router.put('/comment/like/:comment_id', handleCommentLikeRequest);
router.put('/comment/unlike/:comment_id', handleCommentUnlikeRequest);

module.exports = router;
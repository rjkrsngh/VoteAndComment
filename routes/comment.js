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
           mbti, ennegram, likes} = req.body;


    // console.log("attributes in request");
    // console.log(`profileId: ${profileId}, commentTitle: ${commentTitle}, commentText: ${commentText}}
    //             mbti: ${mbti}, ennegram: ${ennegram}, likes: ${likes}`);

    //Insert in comment document, get the ObjId of the newly added comment &
    //push it to comment array in Profile document
    const comment = new Comment({
        profileId, commentedBy, commentTitle,
        commentText, mbti, ennegram, likes
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

//add APIs and their handler methods
router.post('/comment', handlePostCommentOnProfileReq);

module.exports = router;
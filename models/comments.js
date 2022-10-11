const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const CommentSchema = new mongoose.Schema({
    profileId : {
        type: ObjectId,
        ref: 'Profile',
        required: true
    },
    commentedBy: {
        type: String,
        required: true
    },
    commentTitle: {
        type: String
    },
    commentText: {
        type: String
    },
    mbti: {
        type: String
    },
    ennegram: {
        type: String
    },
    likes: {
        type: Number
    }
});

mongoose.model('Comment', CommentSchema);
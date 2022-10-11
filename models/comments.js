const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const CommentSchema = new mongoose.Schema({
    profileId : {
        type: ObjectId,
        ref: Profile
    },
    commentedBy: {
        type: String,
        required: true
    },
    commentText: {
        type: String
    },
});

mongoose.model('Comment', CommentSchema);
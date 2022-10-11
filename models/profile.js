const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

//import required models
require('./comments');

const ProfileSchema = new mongoose.Schema({
    "id": {
        type: Number,
        required: true
    },
    "name": {
        type: String,
        required: true
    },
    "description": {
        type: String,
    },
    "mbti": {
        type: String
    },
    "enneagram": {
        type: String
    },
    "variant": {
        type: String
    },
    "tritype": {
        type: Number
    },
    "socionics":{
        type: String
    },
    "sloan": {
        type: String
    },
    "psyche": {
        type: String
    },
    "image": {
        type: String
    },
    "comments": [{
            type: ObjectId,
            ref: 'Comment'
    }]
});


mongoose.model('Profile', ProfileSchema);
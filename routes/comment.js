'use strict';

const express = require('express');
const { default: mongoose } = require('mongoose');
const router = express.Router();

//Get all required db models
const Profile = mongoose.model('Profile');








module.exports = router;
'use strict';

const express = require('express');
const { default: mongoose } = require('mongoose');
const router = express.Router();

//Get all required db models
const Profile = mongoose.model('Profile');

const profiles = [
  {
    "id": 1,
    "name": "A Martinez",
    "description": "Adolph Larrue Martinez III.",
    "mbti": "ISFJ",
    "enneagram": "9w3",
    "variant": "sp/so",
    "tritype": 725,
    "socionics": "SEE",
    "sloan": "RCOEN",
    "psyche": "FEVL",
    "image": "https://soulverse.boo.world/images/1.png",
  },
  {
    "id": 2,
    "name": "Chea Cutamora",
    "description": "HR @BOO",
    "mbti": "ISjk",
    "enneagram": "c6c",
    "variant": "h7/h7",
    "tritype": 343,
    "socionics": "BELIEVE",
    "sloan": "FEED",
    "psyche": "KKFO",
    "image": "https://soulverse.boo.world/images/1.png"
  },
  {
    "id": 3,
    "name": "Raj Kumar",
    "description": "Software Engineer @ASM",
    "mbti": "ISHJ",
    "enneagram": "r4r",
    "variant": "r5/r4",
    "tritype": 55,
    "socionics": "WONDER",
    "sloan": "DJJFIOJF",
    "psyche": "WIRED",
    "image": "https://soulverse.boo.world/images/1.png"
  }
];

//This method handles request to show user profile  
const handleUserProfileShowReq = (req, res, next) => {
  res.render('profile_template', {
    profile: profiles[0],
  });
};


//This method handles create profile request
const handleUserProfileCreateReq = async (req, res, next) => {
  console.log('Request received: /create');

  //Destructure all atrributes from the body of the request
  const {id, name, description, mbti, enneagram, variant, tritype,
         socionics, sloan, psyche, image} = req.body;

  // console.log(`id: ${id}, name: ${name}, desc: ${description}, mbti: ${mbti}, ennegram: ${enneagram},
  // variant: ${variant}, tritype: ${tritype}, socionics: ${socionics}, sloan: ${sloan}, 
  // psyche: ${psyche}, image: ${image}`);

  //name must not be empty
  if(name.trim().length === 0){
    res.status(400).json({
      error : "mandatory field empty"
    });
  }
  else{
    //Check for a duplicate profile
    await Profile.findOne({name: name})
      .then((existingUser)=>{
        if(existingUser){
          console.log(`Profie already exists for user-> id: ${id}, name: ${name}`);

          res.status(409).json({
            message : "Profile already exists for user"
          });
        }
        else{
          //Create a new profile instance
          const profile = new Profile({
            id, name, description, mbti, enneagram, variant,
            tritype, socionics, sloan, psyche, image
          });

          //save the new profile in the DB and send success response message.
          //If unsuccessful, send appropriate failure response
          profile.save().then((newProfile)=>{
            console.log(`profile created: id: ${id}, user: ${name}`);
            res.status(201).json({
              message: "profile created!"
            });
          }).catch((error)=>{
            console.log(`profile not created: id: ${id}, user: ${name}`);

            res.status(500).json({
              message: "Internal Server Error. Please try again later"
            });
          });
        }
      })
      .catch((error)=>{
        console.log("Error finding user.");
      });
  }
};

const handleGetUserProfileByIdReq = (req, res, next) => {
  const id = req.params.profile_Id;

  console.log(`Request received to get user profile with id: ${id}`);

  Profile.findOne({id : id})
  .then((foundUser)=>{
    if(foundUser){
      console.log(`User with id : ${id} found`);
      console.log(foundUser);
      res.render('profile_template', {
        profile: foundUser,
      });
    }
    else{
      return res.status(404).json({
        message : "User with id: " + id + " not found."
      });
    }
  })
  .catch((error)=>{
    console.log("Error finding user");
  });
}

//add APIs and their handler methods
router.get('/', handleUserProfileShowReq);
router.get('/profile/:profile_Id', handleGetUserProfileByIdReq);
router.post('/profile/create', handleUserProfileCreateReq);

module.exports = router;

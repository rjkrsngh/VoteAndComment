# How to use this project

#Task 1 - Create a user profile
   a. use api '/profile/create/' to create a user profile
   b. use below json as payload

        {
            "id" : 4,
            "name" : "Yuvraj Mall",
            "description" : "UPSC Aapirant",
            "mbti" : "ISHJ",
            "enneagram" : "r4r",
            "variant" : "r5/r4",
            "tritype" : 55,
            "socionics" : "WONDER",
            "sloan" : "DJJFIOJF",
            "psyche" : "WIRED",
            "image" : "https://soulverse.boo.world/images/1.png",
            "comments" : []
        }

#Task 1 - Update the get route to handle profile ids in the url
    a. use api 'profile/:id' to get the profile of a particular user
        NOTE: id is not the id of object in mongodb. It is the id that we send in the create request


#Task 2 - Create a comment on profile
    a. use api '/comment/create' to create a comment on a post
    b. use below JSON as payload

        {
            "profileId" : "6344221c1bd07937f9d26ca7",
            "commentedBy": "Raj Kumar",
            "commentTitle" : "He is an INTJ",
            "commentText" : "Yes, he is an INTJ",
            "mbti" : "HED",
            "ennegram" : "5w4",
            "likes" : 32
        }

#Task 2 - Like a comment
    a. use api '/comment/like/:comment_id' to like a comment

#Task 2 - Unlike a comment
    a. use api '/comment/unlike/:comment_id' to unlike a comment

    NOTE: The comment id used to like or unlike a comment is a mongodb id
    E.g: comment/like/63455fdefa24f8c59fb2e577
    E.g: comment/unlike/63455fdefa24f8c59fb2e577


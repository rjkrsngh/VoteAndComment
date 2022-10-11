# How to use this project

#Task 1 - Create a user profile
   a. use api '/profile/create/' to create a user profile
   b. use below json as payload

        {
            "id" : 4,
            "name" : "Yuvraj Mall",
            "description" : "UPSC Aapirant",
            "mbti" : "ESFJ",
            "enneagram" : "3w4",
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

===================================================================================================================

#Task 2 - Create a comment on profile
    a. use api '/comment/create' to create a comment on a post
    b. use below JSON as payload

        {
            "profileId" : "6344221c1bd07937f9d26ca7",
            "commentedBy": "Raj Kumar",
            "commentTitle" : "He is an INTJ",
            "commentText" : "Yes, he is an INTJ",
            "mbti" : "INTJ",
            "ennegram" : "5w4",
            "zodiac": "Leo",
            "likes" : 32
        }

#Task 2 - Like a comment
    a. use api '/comment/like/:comment_id' to like a comment

#Task 2 - Unlike a comment
    a. use api '/comment/unlike/:comment_id' to unlike a comment

    NOTE: The comment id used to like or unlike a comment is a mongodb id
    E.g: comment/like/63455fdefa24f8c59fb2e577
    E.g: comment/unlike/63455fdefa24f8c59fb2e577



Types used

MBTI -> INFP, INFJ, ENFP, ENFJ, INTJ, INTP, ENTP, ENTJ, ISFP, ISFJ, ESFP, ESFJ, ISTP, ISTJ, ESTP, ESTJ
Ennegram -> 1w2, 2w3, 3w2, 3w4, 4w3, 4w5, 5w4, 5w6, 6w5, 6w7, 7w6, 7w8, 8w7, 8w9, 9w8, 9w1
Zodiac -> Aries, Taurus, Gemini, Cancer, Leo, Virgo, Libra, Scorpio, Sagittarius, Capricorn, Aquarius, Pisces
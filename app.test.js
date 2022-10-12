const supertest = require('supertest');
const app = require('./app');
const request = supertest(app);


//This tests profile creation
describe("POST /profile/create", ()=>{
    describe("provide user details", ()=>{

        test("status of response should be 201 for new user and 409 for duplicate user, else 500", async ()=>{
            const resp = await request.post("/profile/create").send({
                    "id" : 8,
                    "name" : "Suman",
                    "description" : "Software Engineer",
                    "mbti" : "ESFK",
                    "enneagram" : "5w6",
                    "variant" : "r5/r4",
                    "tritype" : 55,
                    "socionics" : "WONDER",
                    "sloan" : "DJJFIOJF",
                    "psyche" : "WIRED",
                    "image" : "https://soulverse.boo.world/images/1.png",
                    "comments" : []
            })

            expect(resp.statusCode).toBe(201);
        })
    })
});


//This tests comment creation
describe("POST /comment/create", ()=>{
    describe("provide comment details", ()=>{

        test("status of response should be 201 if successful, else 500", async ()=>{
            const resp = await request.post("/comment/create").send({
                    "profileId" : "6344221c1bd07937f9d26ca7",
                    "commentedBy": "Jiya Singh",
                    "commentTitle" : "Shee is an INFK",
                    "commentText" : "Yes, he is an INFK. She is my sister too.",
                    "mbti" : "INTJ",
                    "ennegram" : "8w9",
                    "zodiac": "Leo",
                    "likes" : 98
            })

            expect(resp.statusCode).toBe(201);
        })
    })
});



//This tests get profile by ID
describe("GET /profile/:profile_Id", ()=>{
    describe("provide profile id", ()=>{

        test("status of response should be 200 if successful, else 404", async ()=>{
            //const resp = await request.get("/profile/<profile_id>").send();
            const resp = await request.get("/profile/1").send();

            expect(resp.statusCode).toBe(200);
        })
    })
});


//This tests fetching of comment as per the filter and sort selected
describe("GET /comment", ()=>{
    describe("provide profile id", ()=>{

        test("status of response should be 200", async ()=>{
            const resp = await request.get("/comment?profile_id=63458a442e484187cbc079c1&filter_by=INTJ&sort_by=best").send()

            expect(resp.statusCode).toBe(200);
        })
    })
});


//This tests the like comment feature
describe("PUT /comment/like/comment_Id", ()=>{
    describe("provide comment id", ()=>{

        test("status of response should be 200 if successful, else 500", async ()=>{
            const resp = await request.put("/comment/like/6346c31bbc9f3645a14025ac").send()

            expect(resp.statusCode).toBe(200);
        })
    })
});


//This tests the unlike comment feature
describe("PUT /comment/unlike/comment_Id", ()=>{
    describe("provide comment id", ()=>{

        test("status of response should be 200 if successful, else 500", async ()=>{
            const resp = await request.put("/comment/unlike/6346c31bbc9f3645a14025ac").send()

            expect(resp.statusCode).toBe(200);
        })
    })
});
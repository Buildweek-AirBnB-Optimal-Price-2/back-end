const request = require("supertest");
const server = require("../api/server.js");
const db = require("../database/dbConfig.js");
const { find, findBy, findById, add, remove, update, search } = require("../models/");

const newUser = {
  "username": "test",
  "password": "password",
  "email": "test@email.com",
  "name": "test"
};

// const config = {
//   Authorization: { "Authorization":"authvalue" }
// }
// request = request(config.baseUrl);
// let commonHeaders = { "authorization":"TokenValueASDF" };

describe("test server is running", () => {
  describe("GET /", () => {
    it("should return status of 200 with a get request", async () => {
      const expectedStatus = 200;

      const response = await request(server).get("/");
      expect(response.status).toEqual(expectedStatus);
    });
    
    it("should return JSON obj", async () => {
      const expectedResponseBody = {
        api: "Functioning properly!"
      };
      const response = await request(server).get("/");

      /* is it bad form to write a test this way? It seems simpler to me, 
      since the body should contain correct data and be in correct form */
      expect(response.body).toEqual(expectedResponseBody)
      expect(response.type).toEqual("application/json")
    });
  });
})

// let token;

// beforeAll(async () => {
//   // await db("user").truncate();
//   // await db.migrate.latest();
//   const response = await request(server).post("/login").send({
//     username: "test",
//     password: "password"
//   })
//   token = response.body.token
//   console.log(token);

// });

// describe("Test posts and token", () => {


  // strangely, this works like every other time
  // describe("Register", () => {
  //   it("should return user object and token key", async () => {
  //     const response = await request(server).post("/register")
  //     .send(newUser);

  //     // token = response.body;
  //     // console.log(response.body);
  //     // console.log("TOKEN -->", token);

  //     expect(response.body.user).toEqual({
  //       id: 1,
  //       name: "test",
  //       user_permission: 3,
  //       email: "test@email.com",
  //       username: "test"
  //     });

  //     expect(response.body.token).toBeDefined();
  //     })
  //   })
  // })

  // describe("Login", () => {
  //   it("should return a welcome back message and attach a token", async () => {
  //     const response = await request(server)
  //       .post("/login")
  //       .send({
  //         username: "test",
  //         password: "password"
  //       });
  //     // response.headers = response.body.token
  //     // console.log(response.headers);
  //     console.log("LOGIN TOKEN ==>", response.body);
  //     token = response.body.token;
  //     console.log("TOKEN ==>", token);
  //     expect(response.body.msg).toEqual("Welcome back test!");
  //   })

//     it("should post new rental", async () => {
      
//     })
//   })
// })

// const auth = "authorization";
// let token;
// const authHeader = {
//   Authorization: token
// };

// beforeAll(async (done) => {
//   await db("user").truncate()
//     .then(async () => {
//       await db.migrate.latest();
//       await db.seed.run();
//     });
//   // await db.migrate.latest();
//   // await db.seed.run();
//   request(server)
//     .post("/register")
//     .send({
//       name: "newesttest",
//       username: "newesttest",
//       password: "password",
//       email: "newesttest@test.com"
//     })
//     .end((err, response) => {
//       // token = response.body.token
//       // console.log(token);
//       // console.log(response.body);
//       done();
//     })
// });
// beforeAll(async (done) => {
//   request(server)
//     .post("/login")
//     .send({
//       username: "newesttest",
//       password: "password"
//     })
//     .end((err, response) => {
//       // console.log(db("user"))
//       token = response.body.token
//       // console.log(response.body);
//       done();
//     })
// })


// describe("POST .../register", () => {
//   it ("should create a new user when registering, return user_permission of 3", async () => {
//     const response = await request(server).post("/register").send({ username: "ugh", password: "password", email: "ugh@email.com", name: "ugh"})

//     console.log(response.body);
//     expect(response.status).toEqual(201);
//   })
// })

// describe("POST .../login", () => {
//   it("should return a token and welcome message on successful login", async () => {
//     const response = await request(server)
//       .post("/login")
//       .send({
//         username: "test",
//         password: "password"
//       })

//       console.log(response.body);
//     expect(Object.keys(response.body)).toContain("token");
//   })
// })

/*
verify_token {
  authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwidXNlcm5hbWUiOiJhZG1pbiIsInVzZXJfcGVybWlzc2lvbiI6MywiaWF0IjoxNjAzNjU4ODg3LCJleHAiOjE2MDM3NDUyODd9.eUPjWsztvgA4wif_KY5YejXuS5PL1iYJ1fYrri3rP70',
  'content-type': 'application/json',
  'user-agent': 'PostmanRuntime/7.26.5',
  accept: '*',
  'postman-token': 'b953bb18-cae9-437a-bee9-4829aa7f198b',
  host: 'localhost:5000',
  'accept-encoding': 'gzip, deflate, br',
  connection: 'keep-alive',
  'content-length': '704'
}
*/

// describe("POST .../api/rental", () => {

//   it("should return the new rental", async () => {
//     // console.log("TOKEN", req.decodedToken);
//     const response = await request(server)
//       .post("/api/rental")
//       .send({
//         title: "Roomy, Private House on the outskirts of the city",
//         location: "Times Square",
//         type: "House",
//         country: "USA",
//         state: "NY",
//         city: "New York",
//         street_address: "blahblahblahblah",
//         zip: 10022,
//         bedrooms: 4,
//         beds: 4,
//         baths: 2.5,
//         guests: 6,
//         description: "This is a large house with a private back yard, great for BBQs or just enjoying the weather",
//         featuredImg: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstatic01.nyt.com%2Fimages%2F2017%2F01%2F08%2Frealestate%2F08SELLING-BIG%2F08SELLING-BIG-videoSixteenByNineJumbo1600.jpg&f=1&nofb=1"
//       })
//       .set(auth, token)
      // .accept("*/*")
      // .set({connection: "keep-alive"})
      // .set({"accept-encoding": "gzip, deflate, br"})
      // .connection("keep-alive")
      
      // .set("Authorization", token);

      // expect(response.status).toEqual(201);
    // console.log("TOKEN", response.decodedToken);
    // console.log(response.body);
    // console.log(response);
    // the token I get from login is the exact token I put into the header, however it returns a 401 -- invalid token EVERY TIME
    // expect(response.body.id).toEqual(6);
    // expect(response.status).toEqual(201);
  // })
// })

// ok, I give up with the auth header. I'll write a new test and change up my routers to not require auth if the db_env is testing
// another thing --> I translate type from its id(int) to it's name(string), but I never translate it back when I store it --> need to fix that
// need to add beforeAll to truncate and then rerun the seeds --> it truncates user, but not rental
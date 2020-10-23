const request = require("supertest");
const server = require("../api/server.js");
const { find, findBy, findById, add, remove, update, search } = require("../models/");

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
      console.log("SHOULD RETURN JSON", response.body)

      /* is it bad form to write a test this way? It seems simpler to me, 
      since the body should contain correct data and be in correct form */
      expect(response.body).toEqual(expectedResponseBody)
      expect(response.type).toEqual("application/json")
    });
  });
})



describe("POST .../:table", () => {
  let token;
  beforeEach(async () => {
    await request(server)
      .post("/register")
      .send({       
        name: "name",
        username: "name",
        email: "email@email.com",
        password: password
      })
      .end((err, response) => {
        token = response.body.token
      })
      console.log("TOKEN", token);
  })
})

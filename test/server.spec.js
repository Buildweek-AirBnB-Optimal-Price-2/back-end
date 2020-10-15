const { expect } = require("@jest/globals");
const request = require("supertest");
const server = require("../api/server.js");

describe("test server is running", () => {
  describe("index route", () => {
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

      // is it bad form to write a test this way? It seems simpler to me, since the body should contain correct data and be in correct form
      expect(response.body).toEqual(expectedResponseBody)
      expect(response.type).toEqual("application/json")
    });
  });
})
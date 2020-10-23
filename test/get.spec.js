const request = require("supertest");
const server = require("../api/server.js");

describe("GET .../api/:table", () => {

  // const response = request(server).get("/api/rental");
  
  it("should return a status of 200", async () => {
    
    const expectedStatus = 200;
    const response = await request(server).get("/api/rental");

    expect(response.status).toEqual(expectedStatus);
  });
  
  it("should return an array", async () => {
    const response = await request(server).get("/api/rental");
    expect(Array.isArray(response.body)).toEqual(true);
  })
  
  it("should return array with length 5", async () => {
    const response = await request(server).get("/api/rental");
    expect(response.body.length).toEqual(5);
  })
});

describe("GET .../api/:table/id", () => {
  it("should return a status of 200", async () => {
    const expectedStatus = 200;
    const response = await request(server).get("/api/rental/1");

    expect(response.status).toEqual(expectedStatus);
  });

  it("should return an object with 17 keys", async () => {
    const response = await request(server).get("/api/rental/1");
    const expectedKeys = ["id", "renter_id", "title", "location", "type", "country", "state", "city", "street_address", "zip", "bedrooms", "beds", "baths", "guests", "description", "featuredImg", "amenity"];

    expect(typeof response.body).toEqual("object");
    expect(Object.keys(response.body).length).toEqual(17);
    expect(Object.keys(response.body)).toEqual(expectedKeys);
  });
});

describe("GET .../:table/:key/:value", () => {
  it("should return a status of 200", async () => {
    const expectedStatus = 200;
    const response = await request(server).get("/api/rental/id/1");

    expect(response.status).toEqual(expectedStatus);
  });

  it("should return a single object", async () => {
    const response = await request(server).get("/api/rental/id/1");

    expect(typeof response.body).toEqual("object");
  });
});
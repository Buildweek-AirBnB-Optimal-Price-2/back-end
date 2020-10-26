const request = require("supertest");
const db = require("../database/dbConfig");
const server = require("../api/server");

let token;
const auth = "Authorization";
const username = "test";
const password = "password";

const testUser = {
  name: "test",
  username: username,
  email: "test@email.com",
  password: password,
}

const newRental = {
  title: "Roomy, Private House on the outskirts of the city",
  location: "Times Square",
  type: 1,
  country: "USA",
  state: "NY",
  city: "New York",
  street_address: "1234 test street",
  zip: 10022,
  bedrooms: 4,
  beds: 4,
  baths: 2.5,
  guests: 6,
  description: "This is a large house with a private back yard, great for BBQs or just enjoying the weather",
  featuredImg: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstatic01.nyt.com%2Fimages%2F2017%2F01%2F08%2Frealestate%2F08SELLING-BIG%2F08SELLING-BIG-videoSixteenByNineJumbo1600.jpg&f=1&nofb=1"
}

beforeAll(async (done) => {
  await db.seed.run();
  request(server)
    .post("/register")
    .send(testUser)
    .end((err, response) => {
      done();
    })
});

beforeAll(async (done) => {
  request(server)
    .post("/login")
    .send({
      username: username,
      password: password,
    })
    .end((err, response) => {
      token = response.body.token
      done();
    })
})

describe("test authorized routes", () => {
  describe("POST .../api/rental", () => {
    it("should return the new object with amenity array added and type translated to matching string", async () => {
      const response = await request(server)
        .post("/api/rental")
        .send(newRental)
        .set(auth, token);


      expect(response.body.id).toEqual(6);
      expect(response.status).toEqual(201);
      expect(response.body).toHaveProperty("amenity", []);
      expect(typeof response.body.type).toBe("string");
    });
  });

  describe("PUT ../api/rental/5", () => {
    it("should successfully edit rental", async () => {
      const response = await request(server)
        .put("/api/rental/5")
        .send({
          city: "New Jersey"
        })
        .set(auth, token)

      expect(response.body.id).toEqual(5)
      expect(response.body.city).toEqual("New Jersey")
    })
  })
  describe("DELETE ../api/rental/5", () => {
    it("should return a success message upon deletion of selected item", async () => {
      const originalArr = await db("rental");
      const response = await request(server)
        .delete("/api/rental/5")
        .set(auth, token)
      // const newLength = await db("rental").length;
      const newArr = await db("rental");

      const expectedResponse = {
        msg: "Item successfully deleted"
      }

      console.log("DELETE", response.body)
      expect(response.status).toBe(200);
      expect(response.body).toEqual(expectedResponse);
      expect(newArr.length).toBe(originalArr.length - 1);
    });
  });
});


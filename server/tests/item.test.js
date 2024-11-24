const request = require("supertest");
const app = require("../server");
const mongoose = require("mongoose");
const Item = require("../models/Item");

beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("GET /api/items", () => {
  it("should return all items", async () => {
    const res = await request(app).get("/api/items");
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
  });
});

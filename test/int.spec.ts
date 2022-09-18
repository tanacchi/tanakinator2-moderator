// import * as request from "supertest";
import * as request from "supertest";
import app from "../src/app";

describe("get all", () => {
  test("GET:/ が 200 を返す",async () => {
    const response = await request(app).get("/");
    expect(response)
  });
})

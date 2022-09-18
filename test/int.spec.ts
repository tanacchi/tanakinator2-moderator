// import * as request from "supertest";
import * as request from "supertest";
import app from "../src/app";

const TIMESTAMP = Date.now();
const testId = `test_${TIMESTAMP}`;

describe("Integration test", () => {
  test("GET:/ が 200 を返す",async () => {
    const response = await request(app).get("/");
    expect(response.statusCode).toBe(200);
  });

  test("POST:/{id} が 204 を返す",async () => {
    const response = await request(app)
      .post(`/${testId}`)
      .send({
        device: "line",
        status: "pending",
        newQuestion: 2,
      });
    expect(response.statusCode).toBe(204);
  });


  test("GET:/{id} が 200 を返す",async () => {
    const response = await request(app).get(`/${testId}`);
    expect(response.statusCode).toBe(200);
    const responseData = JSON.parse(response.text);
    expect(responseData.result.device).toBe("line");
    expect(responseData.result.status).toBe("pending");
    expect(responseData.result.questions).toStrictEqual([2]);
  });
});

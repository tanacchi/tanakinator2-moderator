// import * as request from "supertest";
import * as request from "supertest";
import app from "../src/app";

const TIMESTAMP = Date.now();
const testId = `test_${TIMESTAMP}`;

describe("Integration test", () => {
  test("GET:/ が results を返す",async () => {
    const response = await request(app).get("/");
    expect(response.statusCode).toBe(200);
    const responseData = JSON.parse(response.text);
    expect(responseData.results).toBeInstanceOf(Array);
  });

  test("POST:/{id} が 204 を返す",async () => {
    const response = await request(app)
      .post(`/${testId}`)
      .send({
        device: "line",
        status: "waiting",
        newQuestion: 2,
      });
    expect(response.statusCode).toBe(204);
  });

  test("GET:/{id} でデータを取得できる",async () => {
    const response = await request(app).get(`/${testId}`);
    expect(response.statusCode).toBe(200);
    const responseData = JSON.parse(response.text);
    expect(responseData.result.device).toBe("line");
    expect(responseData.result.status).toBe("waiting");
    expect(responseData.result.questions).toStrictEqual([2]);
  });

  test("POST:/{id} でデータを更新できる",async () => {
    const response1 = await request(app)
      .post(`/${testId}`)
      .send({
        device: "web",
        status: "asking",
        newQuestion: 4,
      });
    expect(response1.statusCode).toBe(204);

    const response = await request(app).get(`/${testId}`);
    expect(response.statusCode).toBe(200);
    const responseData = JSON.parse(response.text);
    expect(responseData.result.device).toBe("web");
    expect(responseData.result.status).toBe("asking");
    expect(responseData.result.questions).toStrictEqual([2, 4]);
  });

  test("不適な status に対し 400 を返す",async () => {
    const response = await request(app)
      .post(`/${testId}`)
      .send({
        device: "line",
        status: "pending", // Invalid Status
        newQuestion: 2,
      });
    expect(response.statusCode).toBe(400);
  });
});

import * as request from "supertest";
import app from "../src/app";
import client from "../src/models/client";

const TIMESTAMP = Date.now();
const testId = `test_${TIMESTAMP}`;

describe("Integration test", () => {
  afterAll(() => {
    client.quit();
  });

  test("GET:/ が results を返す", async () => {
    const response = await request(app).get("/");
    expect(response.statusCode).toBe(200);
    const responseData = JSON.parse(response.text);
    expect(responseData.results).toBeInstanceOf(Array);
  });

  test("POST:/{id} が 204 を返す", async () => {
    const response = await request(app).post(`/${testId}`).send({
      device: "line",
      status: "waiting",
      new_question: 2,
    });
    expect(response.statusCode).toBe(204);
  });

  test("GET:/{id} でデータを取得できる", async () => {
    const response = await request(app).get(`/${testId}`);
    expect(response.statusCode).toBe(200);
    const responseData = JSON.parse(response.text);
    expect(responseData.result.device).toBe("line");
    expect(responseData.result.status).toBe("waiting");
    expect(responseData.result.questions).toStrictEqual([2]);
  });

  test("POST:/{id} でデータを更新できる", async () => {
    const response1 = await request(app).post(`/${testId}`).send({
      device: "web",
      status: "asking",
      new_question: 4,
    });
    expect(response1.statusCode).toBe(204);

    const response = await request(app).get(`/${testId}`);
    expect(response.statusCode).toBe(200);
    const responseData = JSON.parse(response.text);
    expect(responseData.result.device).toBe("web");
    expect(responseData.result.status).toBe("asking");
    expect(responseData.result.questions).toStrictEqual([2, 4]);
  });

  test("不適な status に対し 400 を返す", async () => {
    const response = await request(app).post(`/${testId}`).send({
      device: "line",
      status: "pending", // Invalid Status
      new_question: 2,
    });
    expect(response.statusCode).toBe(400);
  });

  test("ユーザが存在しない場合，初期値を返す", async () => {
    const randomId = `test_${(Math.random() + 1).toString(36).substring(2)}`;
    const response = await request(app).get(`/${randomId}`);
    expect(response.statusCode).toBe(200);
    const responseData = JSON.parse(response.text);
    expect(responseData.result.device).toBe("web");
    expect(responseData.result.status).toBe("waiting");
    expect(responseData.result.questions).toBe(undefined);
  });
});

"use strict";

import { responseHandlerResponse } from "Middlewares/responseHandler";
import { app } from "../../src/config";

describe("test responseHandler middleware", () => {
  it("test default", () => {
    const data = responseHandlerResponse("Some message");

    expect(data.headers["Access-Control-Allow-Credentials"]).toBe(true);
    expect(data.headers["Access-Control-Allow-Origin"]).toBe("*");
    expect(data.headers["Cache-Control"]).toBe("no-cache");

    expect(data.statusCode).toBe(200);

    expect(typeof data.body).toBe("string");

    const dataBody = JSON.parse(data.body);
    expect(dataBody).toHaveProperty("status", "success");
    expect(dataBody).toHaveProperty("data", "Some message");
  });

  it("test with status code and event", () => {
    const data = responseHandlerResponse("Some message", 201, { someEventKey: "someEventValue" });

    expect(data.statusCode).toBe(201);

    const dataBody = JSON.parse(data.body);
    expect(dataBody).toHaveProperty("status", "success");
    expect(dataBody).toHaveProperty("data", "Some message");
    expect(dataBody).toHaveProperty("_meta", { someEventKey: "someEventValue" });
  });

  it("test with status code and event in non-debug mode", () => {
    // Set debug mode to false
    app.debug = false;

    const data = responseHandlerResponse("Some message", 201, { someEventKey: "someEventValue" });

    expect(data.statusCode).toBe(201);

    const dataBody = JSON.parse(data.body);
    expect(dataBody).toHaveProperty("status", "success");
    expect(dataBody).toHaveProperty("data", "Some message");
    expect(dataBody).toHaveProperty("_meta", {});
  });
});

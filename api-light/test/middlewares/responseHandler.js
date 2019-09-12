"use strict";

import { expect } from "chai";

import { responseHandlerResponse } from "Middlewares/responseHandler";

describe("test responseHandler middleware", () => {
  it("test default", async () => {
    const data = responseHandlerResponse("Some message");

    expect(data.headers["Access-Control-Allow-Credentials"]).to.equal(true);
    expect(data.headers["Access-Control-Allow-Origin"]).to.equal("*");
    expect(data.headers["Cache-Control"]).to.equal("no-cache");

    expect(data.statusCode).to.equal(200);

    expect(data.body).to.be.a("String");

    const dataBody = JSON.parse(data.body);
    expect(dataBody).has.property("status", "success");
    expect(dataBody).has.property("data", "Some message");
  });

  it("test with status code and event", async () => {
    const data = responseHandlerResponse("Some message", 201, { someEventKey: "someEventValue" });

    expect(data.statusCode).to.equal(201);

    const dataBody = JSON.parse(data.body);
    expect(dataBody).has.property("status", "success");
    expect(dataBody).has.property("data", "Some message");
    expect(dataBody).to.have.deep.property("_meta", { someEventKey: "someEventValue" });
  });
});

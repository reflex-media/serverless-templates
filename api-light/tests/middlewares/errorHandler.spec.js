"use strict";

import { expect } from "chai";

import { UNKNOWN_ERROR, VALIDATION_ERROR, VALIDATION_ERROR_SAMPLE } from "Constants/errorCodes";
import { errorHandlerResponse } from "Middlewares/errorHandler";
import ValidationError from "Exceptions/ValidationError";

describe("test errorHandler middleware", () => {
  it("test with thrown Error", async () => {
    const data = errorHandlerResponse(new Error("Test validation error"));

    expect(data.headers["Access-Control-Allow-Credentials"]).to.equal(true);
    expect(data.headers["Access-Control-Allow-Origin"]).to.equal("*");
    expect(data.headers["Cache-Control"]).to.equal("no-cache");

    expect(data.statusCode).to.equal(500);

    expect(data.body).to.be.a("String");

    const dataBody = JSON.parse(data.body);
    expect(dataBody).has.property("status", "error");
    expect(dataBody).has.property("data", null);
    expect(dataBody).has.property("error");
    expect(dataBody).to.have.nested.property("error.code", UNKNOWN_ERROR);
    expect(dataBody).to.have.nested.property("error.message", "Error: Test validation error");
    expect(dataBody).to.have.nested.property("error.details", "");
  });

  it("test with thrown custom Error with default parameters", async () => {
    const data = errorHandlerResponse(new ValidationError("Test validation error"));
    const dataBody = JSON.parse(data.body);

    expect(data.statusCode).to.equal(400);

    expect(dataBody).to.have.nested.property("error.code", VALIDATION_ERROR);
    expect(dataBody).to.have.nested.property(
      "error.message",
      "ValidationError: Test validation error"
    );
    expect(dataBody).to.have.nested.property("error.details", "");
  });

  it("test with thrown custom Error with given parameters", async () => {
    const data = errorHandlerResponse(
      new ValidationError("Test validation error", VALIDATION_ERROR_SAMPLE, 401, {
        extraDataKey: "extraDataValue",
      })
    );
    const dataBody = JSON.parse(data.body);

    expect(data.statusCode).to.equal(401);

    expect(dataBody).to.have.nested.property("error.code", VALIDATION_ERROR_SAMPLE);
    expect(dataBody).to.have.nested.property(
      "error.message",
      "ValidationError: Test validation error"
    );
    expect(dataBody).to.have.deep.nested.property("error.details", {
      extraDataKey: "extraDataValue",
    });
  });

  it("test with error message", async () => {
    const data = errorHandlerResponse("Test error message");
    const dataBody = JSON.parse(data.body);

    expect(data.statusCode).to.equal(500);

    expect(dataBody).to.have.nested.property("error.code", UNKNOWN_ERROR);
    expect(dataBody).to.have.nested.property("error.message", "Test error message");
    expect(dataBody).to.have.nested.property("error.details", "");
  });

  it("test with error message with event", async () => {
    const data = errorHandlerResponse("Test error message", { someEventKey: "someEventValue" });
    const dataBody = JSON.parse(data.body);

    expect(data.statusCode).to.equal(500);

    expect(dataBody).to.have.deep.property("_meta", { someEventKey: "someEventValue" });
  });
});

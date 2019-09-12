"use strict";

import { expect } from "chai";

import ValidationError from "Errors/ValidationError";
import { VALIDATION_ERROR, VALIDATION_ERROR_SAMPLE } from "Constants/errorCodes";

describe("test ValidationError", () => {
  it("test ValidationError with default parameters", async () => {
    const data = new ValidationError("Error exception test");

    expect(data.name).to.equal("ValidationError");
    expect(data.message).to.equal("Error exception test");
    expect(data.code).to.equal(VALIDATION_ERROR);
    expect(data.statusCode).to.equal(400);
    expect(data.extra).to.undefined;
  });

  it("test ValidationError fully defined parameters", async () => {
    const data = new ValidationError("Error exception test", VALIDATION_ERROR_SAMPLE, 444, {
      someKey: "someValue"
    });

    expect(data.name).to.equal("ValidationError");
    expect(data.message).to.equal("Error exception test");
    expect(data.code).to.equal(VALIDATION_ERROR_SAMPLE);
    expect(data.statusCode).to.equal(444);
    expect(data.extra).to.eql({
      someKey: "someValue"
    });
  });
});

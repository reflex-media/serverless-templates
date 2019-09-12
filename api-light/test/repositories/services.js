"use strict";

import chai, { expect } from "chai";
import chaiAsPromised from "chai-as-promised";

import pingServiceRepository from "Repositories/services/pingServiceRepository";
import { VALIDATION_ERROR_SAMPLE, VALIDATION_ERROR_UNKNOWN_PARAMETER } from "Constants/errorCodes";

chai.use(chaiAsPromised);

describe("test pingServiceRepository", () => {
  it("ping request should return Pong", () => {
    return expect(pingServiceRepository(null)).to.eventually.equal("Pong");
  });

  it("ping request with sample error should return error message", () => {
    return expect(pingServiceRepository({ "sample-error": "message" })).to.be.rejectedWith(
      "Error Message"
    );
  });

  it("ping request with sample error exception should return error exception", () => {
    return expect(
      pingServiceRepository({ "sample-error": "exception" })
    ).to.eventually.be.rejected.and.has.property("code", VALIDATION_ERROR_SAMPLE);
  });

  it("ping request with unknown input should return error exception", () => {
    return expect(
      pingServiceRepository({ invalid: "invalid" })
    ).to.eventually.be.rejected.and.has.property("code", VALIDATION_ERROR_UNKNOWN_PARAMETER);
  });
});

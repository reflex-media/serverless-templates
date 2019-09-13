"use strict";

import chai, { expect } from "chai";
import chaiAsPromised from "chai-as-promised";

import ping from "Core/ping";
import { VALIDATION_ERROR_SAMPLE, VALIDATION_ERROR_UNKNOWN_PARAMETER } from "Constants/errorCodes";

chai.use(chaiAsPromised);

describe("test ping core", () => {
  it("ping request should return Pong", () => {
    return expect(ping(null)).to.eventually.equal("Pong");
  });

  it("ping request with sample error should return error message", () => {
    return expect(ping({ "sample-error": "message" })).to.be.rejectedWith(
      "Error Message"
    );
  });

  it("ping request with sample error exception should return error exception", () => {
    return expect(
      ping({ "sample-error": "exception" })
    ).to.eventually.be.rejected.and.has.property("code", VALIDATION_ERROR_SAMPLE);
  });

  it("ping request with unknown input should return error exception", () => {
    return expect(
      ping({ invalid: "invalid" })
    ).to.eventually.be.rejected.and.has.property("code", VALIDATION_ERROR_UNKNOWN_PARAMETER);
  });
});

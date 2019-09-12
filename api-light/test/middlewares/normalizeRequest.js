"use strict";

import { expect } from "chai";

import { VALIDATION_ERROR_UNKNOWN_PARAMETER } from "Constants/errorCodes";
import { normalize } from "Middlewares/normalizeRequest";

describe("test normalizeRequest middleware", () => {
  it("test without parameters", async () => {
    const data = normalize(undefined, null, null);
    expect(data).to.equal(null);
  });

  it("test with valid query string", async () => {
    const data = normalize({}, { someKey: "someValue" }, null);
    expect(data).to.eql({ someKey: "someValue" });
  });

  it("test with valid body and content-type", async () => {
    const data = normalize(
      { "content-type": "application/json" },
      null,
      JSON.stringify({ someKey: "someValue" })
    );

    expect(data).to.eql({ someKey: "someValue" });
  });

  it("test with valid body and Content-Type", async () => {
    const data = normalize(
      { "Content-Type": "application/json" },
      null,
      JSON.stringify({ someKey: "someValue" })
    );

    expect(data).to.eql({ someKey: "someValue" });
  });

  it("test with valid query string and body and Content-Type", async () => {
    const data = normalize(
      { "Content-Type": "application/json" },
      { someKeyQS: "someValueQS" },
      JSON.stringify({ someKeyBody: "someValueBody" })
    );

    expect(data).to.eql({ someKeyQS: "someValueQS", someKeyBody: "someValueBody" });
  });

  it("test with invalid body and valid Content-Type", async () => {
    expect(() => normalize({ "Content-Type": "application/json" }, null, { someKey: "someValue" }))
      .to.throw(Error)
      .and.has.property("code", VALIDATION_ERROR_UNKNOWN_PARAMETER);
  });
});

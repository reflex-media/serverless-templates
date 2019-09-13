"use strict";

import ValidationError from "Exceptions/ValidationError";
import {
  VALIDATION_ERROR,
  VALIDATION_ERROR_SAMPLE,
} from "Constants/errorCodes";

describe("test ValidationError", () => {
  it("test ValidationError with default parameters", () => {
    const data = new ValidationError("Error exception test");

    expect(data.name).toBe("ValidationError");
    expect(data.message).toBe("Error exception test");
    expect(data.code).toBe(VALIDATION_ERROR);
    expect(data.statusCode).toBe(400);
    expect(data.extra).toBeUndefined();
  });

  it("test ValidationError fully defined parameters", () => {
    const data = new ValidationError(
      "Error exception test",
      VALIDATION_ERROR_SAMPLE,
      444,
      {
        someKey: "someValue",
      }
    );

    expect(data.name).toBe("ValidationError");
    expect(data.message).toBe("Error exception test");
    expect(data.code).toBe(VALIDATION_ERROR_SAMPLE);
    expect(data.statusCode).toBe(444);
    expect(data.extra).toMatchObject({
      someKey: "someValue",
    });
  });
});

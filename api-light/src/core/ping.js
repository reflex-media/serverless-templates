import ValidationError from "Exceptions/ValidationError";
import { VALIDATION_ERROR_SAMPLE, VALIDATION_ERROR_UNKNOWN_PARAMETER } from "Constants/errorCodes";

const ping = input => {
  return new Promise((resolve, reject) => {
    if (!input) return resolve("Pong");

    if (input["sample-error"] === "message") {
      return reject("Error Message");
    }

    if (input["sample-error"] === "exception") {
      return reject(new ValidationError("Error exception", VALIDATION_ERROR_SAMPLE));
    }

    reject(new ValidationError("Unknown parameter supplied", VALIDATION_ERROR_UNKNOWN_PARAMETER));
  });
};

export default ping;

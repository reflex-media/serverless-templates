import ValidationError from "Errors/ValidationError";
import { VALIDATION_ERROR_SAMPLE } from "Constants/errorCodes";

const pingServiceRepository = input => {
  return new Promise((resolve, reject) => {
    if (input !== null && input["sample-error"]) {
      if (input["sample-error"] === "message") {
        reject("Error Message");
      } else if (input["sample-error"] === "exception") {
        reject(new ValidationError("Error exception", VALIDATION_ERROR_SAMPLE));
      }
    } else {
      resolve("Pong");
    }
  });
};

export default pingServiceRepository;

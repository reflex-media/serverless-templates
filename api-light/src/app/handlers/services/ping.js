import middy from "middy";
import normalizeRequest from "Middlewares/normalizeRequest";
import errorHandler from "Middlewares/errorHandler";
import responseHandler from "Middlewares/responseHandler";

import ValidationError from "../../errors/ValidationError";

const originalHandler = async event => {
  return await ping(event);
};

const ping = event => {
  const input = event.input;

  return new Promise((resolve, reject) => {
    if (input !== null && input["sample-error"]) {
      if (input["sample-error"] === "message") {
        reject("Error Message");
      } else if (input["sample-error"] === "exception") {
        reject(new ValidationError("Error exception", 40001001));
      }
    } else {
      resolve("Pong");
    }
  });
};

export const handler = middy(originalHandler);

handler
  .use(normalizeRequest())
  .use(responseHandler())
  .use(errorHandler());

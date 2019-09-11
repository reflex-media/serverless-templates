import middy from "middy";

import errorHandler from "Middlewares/errorHandler";
import responseHandler from "Middlewares/responseHandler";
import ValidationError from "../../errors/ValidationError";

const originalHandler = async (event) => {
  return await ping(event);
};

export const ping = (event) => {
  const qs = event.queryStringParameters;

  return new Promise((resolve, reject) => {
    if (qs !== null && qs['sample-error']) {
      if (qs['sample-error'] === 'message') {
        reject("Error Message");
      } else if (qs['sample-error'] === 'exception') {
        reject(new ValidationError("Error exception", 40001001));
      }
    } else {
      resolve("Pong");
    }
  });
};

export const handler = middy(originalHandler);

handler.use(responseHandler()).use(errorHandler());
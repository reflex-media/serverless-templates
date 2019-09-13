import middy from "middy";

import normalizeRequest from "Middlewares/normalizeRequest";
import errorHandler from "Middlewares/errorHandler";
import responseHandler from "Middlewares/responseHandler";

import ping from "Core/ping";

const originalHandler = async event => {
  return await ping(event.input);
};

export const handler = middy(originalHandler);

handler
  .use(normalizeRequest())
  .use(responseHandler())
  .use(errorHandler());

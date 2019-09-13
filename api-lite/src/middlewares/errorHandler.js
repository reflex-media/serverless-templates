import { UNKNOWN_ERROR } from "Constants/errorCodes";
import { app } from "../config";

export const errorHandlerResponse = (error, event = {}) => {
  return {
    headers: {
      "Access-Control-Allow-Credentials": true,
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "no-cache",
    },
    statusCode: error.statusCode || 500,
    body: JSON.stringify({
      status: "error",
      data: null,
      error: {
        code: error.code || UNKNOWN_ERROR,
        message: error.name
          ? `${error.name}: ${error.message}`
          : error.message || error,
        details: error.extra || "",
      },
      _meta: app.debug ? event : {},
    }),
  };
};

/**
 * Formats response for error responses
 */
export default /* istanbul ignore next */ opts => {
  const defaults = {
    logger: console.error, // eslint-disable-line no-console
  };

  const options = { ...defaults, ...opts };

  return {
    onError: (handler, next) => {
      if (typeof options.logger === "function") options.logger(handler.error);
      // eslint-disable-next-line no-param-reassign
      handler.response = errorHandlerResponse(handler.error, handler.event);
      next();
    },
  };
};

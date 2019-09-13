import { app } from "../config";
import { UNKNOWN_ERROR } from "Constants/errorCodes";

/**
 * Formats response for error responses
 */
export default /* istanbul ignore next */ opts => {
  const defaults = {
    logger: console.error,
  };

  const options = { ...defaults, ...opts };

  return {
    onError: (handler, next) => {
      if (typeof options.logger === "function") options.logger(handler.error);
      handler.response = errorHandlerResponse(handler.error, handler.event);
      next();
    },
  };
};

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

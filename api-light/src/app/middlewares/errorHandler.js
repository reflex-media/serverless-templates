import config from "../config";
import { UNKNOWN_ERROR } from "../constants/errorCodes";

/**
 * Formats response for error responses
 */
export default opts => {
  const defaults = {
    logger: console.error
  };

  const options = { ...defaults, ...opts };

  return {
    onError: (handler, next) => {
      if (typeof options.logger === "function") {
        options.logger(handler.error);
      }

      handler.response = {
        headers: {
          "Access-Control-Allow-Credentials": true,
          "Access-Control-Allow-Origin": "*",
          "Cache-Control": "no-cache"
        },
        statusCode: handler.error.statusCode || 500,
        body: JSON.stringify({
          status: "error",
          data: null,
          error: {
            code: handler.error.code || UNKNOWN_ERROR,
            message: handler.error.name || handler.error.message || handler.error,
            details: handler.error.message || handler.error.details || "",
          },
          _meta: config.app.debug ? handler.event : {}
        })
      };

      next();
    }
  };
};

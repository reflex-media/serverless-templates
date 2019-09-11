import ValidationError from "../errors/ValidationError";

/**
 * Normalizes handler.event.body and handler.event.queryStringParameters
 * as handler.event.input Object
 */
export default opts => {
  return {
    before: (handler, next) => {
      const { queryStringParameters, headers, body } = handler.event;
      let input = null;

      if (!headers && qs === null) {
        handler.event.input = input;
        return next();
      }

      if (queryStringParameters !== null) {
        input = queryStringParameters;
      }

      const contentType = headers["Content-Type"] || headers["content-type"];

      if (!contentType) {
        handler.event.input = input;
        return next();
      }

      if (contentType.startsWith("application/json")) {
        try {
          input = {
            ...input,
            ...JSON.parse(body),
          };
        } catch (err) {
          throw new ValidationError(
            "Content type defined as JSON but an invalid JSON was provided",
            40001002
          );
        }
      }

      handler.event.input = input;

      next();
    },
  };
};

/**
 * Example middleware accepts before, after, onError
 *
 * Refer to middy for more documentation.
 */
/* istanbul ignore next */
const exampleMiddleware = () => {
  return {
    before: (handler, next) => {
      next();
    },
    after: (handler, next) => {
      next();
    },
    onError: (handler, next) => {
      next();
    },
  };
};

export default exampleMiddleware;

import config from '../config';

/**
 * Formats response for successful responses
 */
export default (opts) => {
  const defaults = {
    statusCode: 200,
  };

  const options = { ...defaults, ...opts };

  return {
    after: (handler, next) => {
      handler.response = {
        headers: {
          'Access-Control-Allow-Credentials': true,
          'Access-Control-Allow-Origin': '*',
          'Cache-Control': 'no-cache',
        },
        statusCode: options.statusCode,
        body: JSON.stringify({
          status: 'success',
          data: handler.response,
          _meta: config.app.env !== 'prod' ? handler.event : {},
        }),
      };

      next();
    },
  };
};

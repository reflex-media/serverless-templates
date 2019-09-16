import { app } from '../config';

export const responseHandlerResponse = (
  response,
  statusCode = 200,
  event = {}
) => {
  return {
    headers: {
      'Access-Control-Allow-Credentials': true,
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'no-cache',
    },
    statusCode,
    body: JSON.stringify({
      status: 'success',
      data: response,
      _meta: app.debug ? event : {},
    }),
  };
};

/**
 * Formats response for successful responses
 */
export default /* istanbul ignore next */ opts => {
  const defaults = {
    statusCode: 200,
  };

  const options = { ...defaults, ...opts };

  return {
    after: (handler, next) => {
      // eslint-disable-next-line no-param-reassign
      handler.response = responseHandlerResponse(
        handler.response,
        options.statusCode,
        handler.event
      );
      next();
    },
  };
};

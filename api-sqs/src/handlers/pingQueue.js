import middy from 'middy';

import normalizeRequest from 'Middlewares/normalizeRequest';
import errorHandler from 'Middlewares/errorHandler';
import responseHandler from 'Middlewares/responseHandler';

import pingQueue from 'Core/pingQueue';

const originalHandler = event => {
  return pingQueue(event.input);
};

// eslint-disable-next-line import/prefer-default-export
export const handler = middy(originalHandler);

handler
  .use(normalizeRequest())
  .use(responseHandler())
  .use(errorHandler());

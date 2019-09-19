import middy from 'middy';
import { normalizeHttpRequest, successHttpResponse } from 'slsrun/middlewares';

import errorHandler from 'Middlewares/errorHandler';
import ping from 'Core/ping';
import { app } from '../config';

const originalHandler = event => {
  return ping(event.input);
};

// eslint-disable-next-line import/prefer-default-export
export const handler = middy(originalHandler);

handler
  .use(normalizeHttpRequest())
  .use(successHttpResponse({ debugMode: app.debug }))
  .use(errorHandler());

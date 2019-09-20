import middy from 'middy';
import { http } from 'slsrun/middlewares';

import ping from 'Core/ping';
import { app } from '../config';

const originalHandler = event => {
  return ping(event.input);
};

// eslint-disable-next-line import/prefer-default-export
export const handler = middy(originalHandler);

handler.use(http({ debugMode: app.debug }));

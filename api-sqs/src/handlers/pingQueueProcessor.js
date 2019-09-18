import middy from 'middy';

import normalizeRecords from 'Middlewares/normalizeRecords';
import pingQueueProcessor from 'Core/pingQueueProcessor';

const originalHandler = event => {
  pingQueueProcessor(event.collection);
};

// eslint-disable-next-line import/prefer-default-export
export const handler = middy(originalHandler);

handler.use(normalizeRecords());

import ErrorException from 'Exceptions/ErrorException';
import { PING_QUEUE_PROCESSOR_SAMPLE_ERROR } from 'Constants/errorCodes';

const pingQueueProcessor = collection => {
  if (collection[0].data === undefined || collection[0].data === null)
    return collection;

  if (collection[0].data['failed-queue'] === undefined) return collection;

  throw new ErrorException(
    'Sample processed queue error',
    PING_QUEUE_PROCESSOR_SAMPLE_ERROR,
    400
  );
};

export default pingQueueProcessor;

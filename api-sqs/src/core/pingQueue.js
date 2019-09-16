import SQSService from 'Services/SQSService';

import { aws } from '../config';

const pingQueue = async input => {
  const payload = {
    data: input,
  };

  // try {
  const sqsService = new SQSService();
  const res = await sqsService.enqueue(payload, aws.sqs.pingQueue.name);
  // console.log('res', res);
  return res;
  // } catch (err) {
  // console.log('err', err);
  // throw err;
  // }
};

export default pingQueue;

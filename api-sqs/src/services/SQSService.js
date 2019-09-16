import { SQS } from 'aws-sdk';

import { aws } from '../config';

export default class SQSService {
  constructor() {
    this.SQS = new SQS();
  }

  /**
   * Sends a message to the queue
   *
   * @param {object} payload
   * @param {string} queueName
   */
  enqueue(payload, queueName) {
    return this.SQS.sendMessage({
      MessageBody: JSON.stringify(payload),
      QueueUrl: `${aws.sqs[queueName]}`,
    }).promise();
  }
}

import { SQS } from 'aws-sdk';
import { aws } from '../config';

export default class SQSService {
  constructor(
    opts = {
      accessKeyId: null,
      secretAccessKey: null,
      region: null,
    }
  ) {
    this.sqsClient = new SQS({
      ...opts,
    });
  }

  /**
   * Sends a payload to the queue
   *
   * @param {object} payload
   * @param {string} queueName
   */
  enqueue(payload, queueName) {
    return this.sqsClient
      .sendMessage({
        MessageBody: JSON.stringify(payload),
        QueueUrl: `${aws.sqs[queueName].url}`,
      })
      .promise();
  }
}

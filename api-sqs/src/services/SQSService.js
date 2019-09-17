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
    let options = {};

    if (opts.accessKeyId !== null) {
      options = { ...options, accessKeyId: opts.accessKeyId };
    }
    if (opts.secretAccessKey !== null) {
      options = { ...options, secretAccessKey: opts.secretAccessKey };
    }
    if (opts.region !== null) {
      options = { ...options, region: opts.region };
    }

    this.sqsClient = new SQS({
      ...{ options },
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

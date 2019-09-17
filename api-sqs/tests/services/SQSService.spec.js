import SQSService from 'Services/SQSService';
import { aws } from '../../src/config';

describe('test SQSService', () => {
  it('should enqueue without custom opts', () => {
    const sqsInstance = new SQSService();
    return expect(
      sqsInstance.enqueue({ someData: 'someValue' }, 'pingQueue')
    ).resolves.toMatchObject({
      MessageId: 'MessageId',
      mocked: {
        opts: {},
        params: {
          MessageBody: '{"someData":"someValue"}',
          QueueUrl: `${aws.sqs.pingQueue.url}`,
        },
      },
    });
  });

  it('should enqueue with custom opt accessKeyId', () => {
    const sqsInstance = new SQSService({ accessKeyId: 'accessKeyId' });
    return expect(
      sqsInstance.enqueue({ someData: 'someValue' }, 'pingQueue')
    ).resolves.toMatchObject({
      MessageId: 'MessageId',
      mocked: {
        opts: {
          accessKeyId: 'accessKeyId',
        },
        params: {
          MessageBody: '{"someData":"someValue"}',
          QueueUrl: `${aws.sqs.pingQueue.url}`,
        },
      },
    });
  });

  it('should enqueue with custom opt secretAccessKey', () => {
    const sqsInstance = new SQSService({ secretAccessKey: 'secretAccessKey' });
    return expect(
      sqsInstance.enqueue({ someData: 'someValue' }, 'pingQueue')
    ).resolves.toMatchObject({
      MessageId: 'MessageId',
      mocked: {
        opts: {
          secretAccessKey: 'secretAccessKey',
        },
        params: {
          MessageBody: '{"someData":"someValue"}',
          QueueUrl: `${aws.sqs.pingQueue.url}`,
        },
      },
    });
  });

  it('should enqueue with custom opt region', () => {
    const sqsInstance = new SQSService({ region: 'region' });
    return expect(
      sqsInstance.enqueue({ someData: 'someValue' }, 'pingQueue')
    ).resolves.toMatchObject({
      MessageId: 'MessageId',
      mocked: {
        opts: {
          region: 'region',
        },
        params: {
          MessageBody: '{"someData":"someValue"}',
          QueueUrl: `${aws.sqs.pingQueue.url}`,
        },
      },
    });
  });
});

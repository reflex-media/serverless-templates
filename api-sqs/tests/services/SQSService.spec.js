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

  it('should enqueue with override options', () => {
    aws.sqs.options.override = true;
    aws.sqs.options.accessKeyId = 'accessKeyId';
    aws.sqs.options.secretAccessKey = 'secretAccessKey';
    aws.sqs.options.region = 'region';

    const sqsInstance = new SQSService();
    return expect(
      sqsInstance.enqueue({ someData: 'someValue' }, 'pingQueue')
    ).resolves.toMatchObject({
      MessageId: 'MessageId',
      mocked: {
        opts: {
          accessKeyId: 'accessKeyId',
          secretAccessKey: 'secretAccessKey',
          region: 'region',
        },
        params: {
          MessageBody: '{"someData":"someValue"}',
          QueueUrl: `${aws.sqs.pingQueue.url}`,
        },
      },
    });

    // @FIXME figure a way to revert the override above
    // aws.sqs.options.override = false;
    // aws.sqs.options.accessKeyId = '';
    // aws.sqs.options.secretAccessKey = '';
    // aws.sqs.options.region = '';
  });
});

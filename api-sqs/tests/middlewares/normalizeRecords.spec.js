import { normalize } from 'Middlewares/normalizeRecords';

describe('test normalizeRecords middleware', () => {
  it('test without parameters', () => {
    const data = normalize(undefined);
    expect(data).toBe(null);
  });

  it('test with valid empty records', () => {
    const data = normalize({});
    expect(data).toBe(null);
  });

  it('test with valid SQS records', () => {
    const data = normalize([
      {
        messageId: 'messageId',
        receiptHandle: 'receiptHandle',
        body: '{"data":{"testQueueKey":"testQueueValue"}}',
      },
    ]);
    expect(data).toMatchObject([
      {
        messageId: 'messageId',
        receiptHandle: 'receiptHandle',
        data: {
          testQueueKey: 'testQueueValue',
        },
      },
    ]);
  });
});

import pingQueueProcessor from 'Core/pingQueueProcessor';
import ValidationError from 'Exceptions/ValidationError';

describe('test pingQueueProcessor core', () => {
  it('pingQueueProcessor request without any input data should complete', () => {
    return expect(
      pingQueueProcessor([
        {
          messageId: 'messageId',
          receiptHandle: 'receiptHandle',
        },
      ])
    ).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          messageId: 'messageId',
        }),
      ])
    );
  });

  it('pingQueueProcessor request with input data should complete', () => {
    return expect(
      pingQueueProcessor([
        {
          messageId: 'messageId',
          receiptHandle: 'receiptHandle',
          data: {
            someKey: 'someValue',
          },
        },
      ])
    ).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          messageId: 'messageId',
          receiptHandle: 'receiptHandle',
          data: {
            someKey: 'someValue',
          },
        }),
      ])
    );
  });

  it('pingQueueProcessor request should throw an error', () => {
    return expect(() =>
      pingQueueProcessor([
        {
          messageId: 'messageId',
          receiptHandle: 'receiptHandle',
          data: {
            'failed-queue': '',
          },
        },
      ])
    ).toThrow(ValidationError);
  });
});

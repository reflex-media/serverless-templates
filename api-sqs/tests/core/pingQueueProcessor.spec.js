import pingQueueProcessor from 'Core/pingQueueProcessor';

describe('test pingQueueProcessor core', () => {
  it('pingQueueProcessor request should return Collection', () => {
    return expect(
      pingQueueProcessor({
        messageId: 'messageId',
        receiptHandle: 'receiptHandle',
        data: {
          someKey: 'someValue',
        },
      })
    ).toHaveProperty('messageId', 'messageId');
  });
});

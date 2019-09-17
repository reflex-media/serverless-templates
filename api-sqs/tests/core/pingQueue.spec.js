import pingQueue from 'Core/pingQueue';

describe('test pingQueue core', () => {
  it('pingQueue request should return MessageId', () => {
    return expect(pingQueue({ someKey: 'someValue' })).resolves.toHaveProperty(
      'MessageId',
      'MessageId'
    );
  });
});

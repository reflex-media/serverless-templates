import SQSService from 'Services/SQSService';

describe('test SQSService', () => {
  it('should send message with enqueue', () => {
    const sqsInstance = new SQSService();
    return expect(
      sqsInstance.enqueue({ someData: 'someValue' }, 'pingQueue')
    ).resolves.toHaveProperty('MessageId', 'MessageId');
  });
});

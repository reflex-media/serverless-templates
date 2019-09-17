import SQSService from 'Services/SQSService';

describe('test SQSService', () => {
  it('should send message with enqueue', () => {
    const sqsInstance = new SQSService();
    return expect(
      sqsInstance.enqueue({ someData: 'someValue' }, 'pingQueue')
    ).resolves.toHaveProperty('MessageId', 'MessageId');
  });

  it('should set custom access key when instantiated', () => {
    const sqsInstance = new SQSService({ accessKeyId: 'accessKeyId' });
    return expect(
      sqsInstance.enqueue({ someData: 'someValue' }, 'pingQueue')
    ).resolves.toHaveProperty('MessageId', 'MessageId');
  });
});

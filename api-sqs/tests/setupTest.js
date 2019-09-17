// Add test-specific environment configurations
process.env.APP_ENV = 'test';
process.env.APP_DEBUG = true;

// Mock AWS SDK
jest.mock('aws-sdk', () => {
  return {
    SQS: jest.fn().mockImplementation(() => {
      return {
        sendMessage: jest.fn().mockImplementation(() => {
          return {
            promise: jest.fn().mockImplementation(() => {
              return new Promise(resolve => {
                const response = {
                  ResponseMetadata: {
                    RequestId: 'RequestId',
                  },
                  MD5OfMessageBody: 'MD5OfMessageBody',
                  MessageId: 'MessageId',
                };
                resolve(response);
              });
            }),
          };
        }),
      };
    }),
  };
});

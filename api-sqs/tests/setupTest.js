// Add test-specific environment configurations
process.env.APP_ENV = 'test';
process.env.APP_DEBUG = true;
process.env.AWS_ACCOUNT_REGION = 'ap-southeast-1';
process.env.AWS_ACCOUNT_ID = '111111111111';

// Mock AWS SDK
jest.mock('aws-sdk', () => {
  return {
    SQS: jest.fn().mockImplementation(opts => {
      return {
        sendMessage: jest.fn().mockImplementation(params => {
          return {
            promise: jest.fn().mockImplementation(() => {
              return new Promise(resolve => {
                const response = {
                  ResponseMetadata: {
                    RequestId: 'RequestId',
                  },
                  MD5OfMessageBody: 'MD5OfMessageBody',
                  MessageId: 'MessageId',
                  mocked: {
                    opts,
                    params,
                  },
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

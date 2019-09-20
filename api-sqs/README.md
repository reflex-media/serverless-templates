# API With SQS Serverless Template

[![Build Status](https://travis-ci.org/reflex-media/serverless-templates.svg?branch=master)](https://travis-ci.org/reflex-media/serverless-templates)
[![Coverage Status](https://coveralls.io/repos/github/reflex-media/serverless-templates/badge.svg?branch=master)](https://coveralls.io/github/reflex-media/serverless-templates?branch=master)

Bootstrap your next API serverless project with Simple Queue Service (SQS). Recommended for event-based / log-based projects.

**Included Resources:**

- API Gateway
- Lambda
- SQS

**NOTE:** This is not an introduction to the Serverless Framework. You would already need to know how Serverless Framework works prior to using of this template.

## Quick Start

**Prerequisites**: Install Serverless Framework with: `npm install -g serverless`.

Create Serverless project

```bash
$ sls create --template-url https://github.com/mosufy/serverless-templates/tree/master/api-sqs --path my-service
$ cd my-service
```

Install dependencies

```bash
$ yarn install
```

Start local

```bash
$ yarn start
```

Access local url via browser or Postman (recommended): http://localhost:8181/ping.

**NOTE:** SQS is not available in offline mode.

## Directory Structure

```
├── config
|   ├── environments
|   |   ├── .env
|   |   ├── .env.local
|   |   ├── .env.development
|   |   ├── .env.staging
|   |   └── .env.production
|   ├── functions
|   ├── resources
|   └── utils
├── src
|   ├── constants
|   ├── core
|   ├── exceptions
|   ├── handlers
|   ├── middlewares
|   |   ├── errorHandler.js
|   |   ├── normalizeRecords.js
|   |   ├── normalizeRequest.js
|   |   └── responseHandler.js
|   ├── services
|   └── config.js
└── tests
```

**config/**  
Contains serverless configurations.

**config/environments/**  
Contains environment-specific configurations. The environment files are used for both deployment and within application code.

You may overwrite env files during a deployment by adding a `.local` suffix e.g; `.env.development.local`. This is useful for when you want to deploy to a specific environment but not wanting to overwrite committed values.

> `.env`: default environment, served as a local example.  
> `.env.local`: local environment configuration. This should not be committed.  
> `.env.development`: development environment configuration.  
> `.env.staging`: staging environment configuration.  
> `.env.production`: production environment configuration.

**config/functions/**  
Serverless functions should be configured here.

**config/resources/**  
Serverless resources should be configured here.

**config/utils/**  
Additional Serverless configs where required.

**src/**  
Main source code for your application.

**src/constants/**  
Write application constants here.

**src/core/**  
Write application core business/application logic here.

**src/exceptions/**  
Application error classes.

**src/handlers/**  
Entry point for all events.

**src/middlewares/**  
Request middlewares. See [Middlewares](#middlewares) for more information.

**src/services/**  
3rd party services or modules.

**src/config.js**  
Configuration used within application.

**tests/**  
All test files to be written here.

## Available Commands

**Start local**

```bash
$ yarn start
```

**Deploy application**

```bash
$ yarn deploy -s {environment}

# Example deploy to dev environment
$ yarn deploy -s dev
```

**Deploy single function**

```bash
$ yarn deploy -s {environment} -f {function_name}

# Example deploy Ping function
$ yarn deploy -s dev -f Ping
```

**Invoke single function**

```bash
$ yarn invoke -s {environment} -f {function_name}

# Example invoke Ping function
$ yarn invoke -s dev -f Ping
```

**Tail log of a single function**

```bash
$ yarn logs -s {environment} -f {function_name}

# Example tail log of Ping function
$ yarn logs -s dev -f Ping
```

## Environment Configurations

All environment configurations are available in the `config/environments/` directory.

```bash
# Declare the environment
APP_ENV="development"

# Enable/disable debug mode
APP_DEBUG=true

# Determine the region to deploy to
AWS_ACCOUNT_REGION="us-west-1"

# This name needs to match the aws credentials profile on your local machine
AWS_ACCOUNT_PROFILE="slsDevProfile"

# Set the default timeout for all lambda functions
AWS_LAMBDA_TIMEOUT=3

# Set the default memory size for all lambda functions
AWS_LAMBDA_MEMORY_SIZE=128

# Set the default retention period for all cloudwatch logs
AWS_LOG_RETENTION_DAYS=7

# Define your own custom API Gateway Secret Key
AWS_APIGATEWAY_SECRET_KEY=

# Maximum size before gzip compression for response
AWS_APIGATEWAY_COMPRESSION_MAX_BYTES=
```

## Available Endpoints

**`/ping`**  
Send a "liveness-check" request to your endpoint.

**`/ping/auth`**  
Send a "liveness-check" request with a required authorization.  
**Note**: Set `x-api-key` in your request header for a valid request.

**`/ping?sample-error=message`**  
Returns the request with an "error message" response type.

**`/ping?sample-error=exception`**  
Returns the request with an "error class" response type.

**`/ping/queue`**  
Send a ping request queued to SQS.  
**Note**: Set `x-api-key` in your request header for a valid request.

**`/ping/queue?failed-queue`**  
Send a ping request queued to SQS as a failed job.  
**Note**: Set `x-api-key` in your request header for a valid request.

## How It Works

1. Client sends a GET request to `/ping/queue`
2. `pingQueue` lambda function accepts the request and sends an SQS message
3. Message is put into the `pingQueue`
4. SQS queue receives the message and fires a `pingQueueProcessor` lambda function
5. Based on the default configurations:
   - Should no error occur, message will be deleted from the queue
   - Should an error occurr, message will be put in-flight for 5min (as per `VisibilityTimeout` set)
   - Message will be made available on expiry of `VisibilityTimeout`
   - Message will be retried for a maximum of 3 tries (as per `maxReceiveCount`)
   - Should a message continue to fail after the max retries, it will be put into the `pingQueueDLQ` queue.

### Connecting To Separate SQS Instance

To connect to a different SQS instance, you may override the config by updating these in the environments file.

```bash
# Enable/disable override
AWS_SQS_OPTIONS_OVERRIDE=true

# Set IAM access key with SQS access
AWS_SQS_OPTIONS_ACCESS_KEY_ID=

# Set IAM secret key
AWS_SQS_OPTIONS_SECRET_ACCESS_KEY=

# Set SQS region to connect to
AWS_SQS_OPTIONS_REGION=
```

## Middlewares

Middlewares can be executed before or after a request. This will be useful for cases where an action is required prior to reaching the handler, or when an action is required to execute prior to the returning of the response.

Middlewares require [Middy npm](https://www.npmjs.com/package/middy) to work.

Middlewares should be written in the `src/middlewares/` directory.

### Available Middlewares

This template contains 3 middlewares.

**`normalizeRecords.js`**  
This middleware will normalize records coming from sqs message event. The `Records` object in the `handler.event` will not be normalized into `handler.event.collection`. This middleware executes _before_ the handler is called.

**`normalizeRequest.js`**  
This middleware will normalize query string parameters and/or json body in the request into a common `handler.event.input`. This middleware executes _before_ the handler is called.

**`responseHandler.js`**  
This middleware will be executed whenever a successful response is expected to be returned. This middleware executes _after_ the request is processed and _before_ the response is returned.

**`errorHandler.js`**  
This middleware will be executed whenever an error response is expected to be returned. This middleware executes _after_ the request is processed and _before_ the response is returned.

```js
import middy from 'middy';
import normalizeResponse from 'Middlewares/normalizeResponse';

const originalHandler = (event) => {
  const data = event.collection;
};

export const handler = middy(originalHandler);

handler.use(normalizeResponse());
```

Refer to `src/handlers/pingQueueProcessor.js` for usage.

You may also import other ready-made middlewares from the [Middy repository](https://www.npmjs.com/package/middy#available-middlewares).

### Custom Middlewares

You can write your own custom middleware with [Middy](https://www.npmjs.com/package/middy#writing-a-middleware).

## Error Handling

It is recommended to always throw an Error class as an exception instead of returning just an error message. You may create your own Error Class within the `src/exceptions/` directory.

```js
import ValidationError from 'Errors/ValidationError';

const someFunction = () => {
  throw new ValidationError(
    'Content type defined as JSON but an invalid JSON was provided',
    40001002,
    400
  );
};
```

Refer to the sample `src/core/ping.js` for usage.

### Custom Error Classes

You can define your own Error Classes as required. Refer to the existing `src/exceptions/ValidationError.js` class.

## Unit Test

This template uses Jest test framework for unit testing.

All test files exist in the `tests/` directory.

**Run test**

```bash
$ yarn test
```

**Run code coverage report**

```bash
$ yarn coverage
```

View the generated html report in `coverage/index.html`.

### Test environment

Declare test environment configurations as NODE variables in `tests/setup.js`.

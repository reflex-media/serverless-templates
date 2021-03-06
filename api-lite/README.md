# Lightweight API Serverless Template

[![Build Status](https://travis-ci.org/reflex-media/serverless-templates.svg?branch=master)](https://travis-ci.org/reflex-media/serverless-templates)
[![Coverage Status](https://coveralls.io/repos/github/reflex-media/serverless-templates/badge.svg?branch=master)](https://coveralls.io/github/reflex-media/serverless-templates?branch=master)

Bootstrap your next API serverless project with the most basic resources. Recommended for quick, single function or endpoint.

**Included Resources:**

- API Gateway
- Lambda

**NOTE:** This is not an introduction to the Serverless Framework. You would already need to know how Serverless Framework works prior to using of this template.

## Quick Start

**Prerequisites**: Install Serverless Framework with: `npm install -g serverless`.

Create Serverless project

```bash
$ sls create --template-url https://github.com/mosufy/serverless-templates/tree/master/api-lite --path my-service
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

Access local url via browser or Postman (recommended): http://localhost:8181/ping

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

## Middlewares

Middlewares can be executed before or after a request. This will be useful for cases where an action is required prior to reaching the handler, or when an action is required to execute prior to the returning of the response.

Middlewares require [Middy npm](https://www.npmjs.com/package/middy) to work.

Middlewares should be written in the `src/middlewares/` directory.

### Available Middlewares

This template contains 3 middlewares.

**`normalizeRequest.js`**  
This middleware will normalize query string parameters and/or json body in the request into a common `handler.event.input`. This middleware executes _before_ the handler is called.

**`responseHandler.js`**  
This middleware will be executed whenever a successful response is expected to be returned. This middleware executes _after_ the request is processed and _before_ the response is returned.

**`errorHandler.js`**  
This middleware will be executed whenever an error response is expected to be returned. This middleware executes _after_ the request is processed and _before_ the response is returned.

```js
import middy from 'middy';
import normalizeRequest from 'Middlewares/normalizeRequest';
import responseHandler from 'Middlewares/responseHandler';
import errorHandler from 'Middlewares/errorHandler';

const originalHandler = async () => {
  return await new Promise(resolve => resolve('Pong'));
};

export const handler = middy(originalHandler);

handler
  .use(normalizeRequest())
  .use(responseHandler())
  .use(errorHandler());
```

Refer to `src/handlers/ping.js` for usage.

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

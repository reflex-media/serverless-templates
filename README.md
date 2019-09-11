# Serverless Templates
This repository contains a set of serverless templates to bootstrap your serverless projects.

**NOTE:** This is not an introduction to the Serverless Framework. You would already need to know how Serverless Framework works prior to using any of the templates.

## Motivation
Through the years I have created several serverless projects/microservices and come to realise that most of the base requirements are the same. With each project, I tend to copy-and-paste them and just to kickstart/bootstrap a new project.

I came to realise that Serverless supports Templates and thus, this repository is born.

## Quick Start

Create Serverless project:
```
$ sls create --template-url https://github.com/mosufy/serverless-templates/tree/master/api --path my-service

$ cd my-service
```

Install dependencies:
```
$ yarn install
```

Run on local:
```
$ yarn server
```

Access local url via browser or Postman (recommended): http://localhost:8181/services/ping

## Directory Structure
All templates have minimally the same basic folder structure as described below.

```
- root
  - environments
  - scripts
  - src
    - app
      - handlers
      - repositories
    - functions
    - resources
    - utils
```

**`environments`**  
All env files (env-specific configurations) will be stored here.

**`scripts`**  
Deployment/build specific scripts.

**`src`**  
Main source code for your project.

**`src/app`**  
Application specific code should only be stored here.

**`src/app/handers`**  
Entry point for all requests.

**`src/app/repositories`**  
Business logic (application code) should be added here.

**`src/functions`**  
Serverless functions should be configured here.

**`src/resources`**  
Serverless resources should be configured here.

**`src/utils`**  
Additional Serverless files where required.

## Available Commands

**Run on local:**
```
$ yarn server
```

**Deploy to AWS:**

*deploy dev*
```
$ yarn deploy-dev
```

*deploy test*
```
$ yarn deploy-test
```

*deploy prod*
```
$ yarn deploy-prod
```

**Deploy single function to AWS:**
```
$ yarn deploy-dev -f {function_name}
```
*example*
```
$ yarn deploy-dev -f ServicePing
```

**Invoke single function**
```
$ yarn invoke-dev -f {function_name}
```
*example*
```
$ yarn invoke-dev -f ServicePing
```

**Tail log of a single function**
```
$ yarn logs-dev -f {function_name}
```
*example*
```
$ yarn logs-dev -f ServicePing
```

## Available Templates

### API
Boilerplate for any API-based projects.

**Included AWS services in this template:**
- API Gateway
- Lambda

#### Get Started

Create Serverless project:
```
$ sls create --template-url https://github.com/mosufy/serverless-templates/tree/master/api --path my-service

$ cd my-service
```

Install dependencies:
```
$ yarn install
```

Run on local:
```
$ yarn server
```

Access local url via browser or Postman (recommended): http://localhost:8181/services/ping

#### Configurations
All configurations are available in the `environments/` directory.

```
# Declare the environment
APP_ENV: dev

# Enable/disable debug mode
APP_DEBUG: true

# Determine the region to deploy to
AWS_ACCOUNT_REGION: us-west-1

# This name needs to match the aws credentials profile on your local machine
AWS_ACCOUNT_PROFILE: slsDevProfile

# Set the default timeout for all lambda functions
AWS_LAMBDA_TIMEOUT: 3

# Set the default memory size for all lambda functions
AWS_LAMBDA_MEMORY_SIZE: 128

# Set the default retention period for all cloudwatch logs
AWS_LOG_RETENTION_DAYS: 7

# Define your own custom API Gateway Secret Key
AWS_APIGATEWAY_SECRET_KEY: 
```

#### Available Endpoints

`/services/ping`  
Send a "liveness-check" request to your endpoint.

`/services/ping/auth`  
Send a "liveness-check" request with a required authorization.  
**Note**: Set `x-api-key` in your request header for a valid request.

`/services/ping?sample-error=message`  
Returns the request with an "error" response type.

`/services/ping?sample-error=exception`  
Returns the request with an "exception" response type.

#### Directory Structure

```
- root
  - environments
  - scripts
  - src
    - app
      - constants
      - errors
      - handlers
        - services
      - middlewares
      - repositories
    - functions
    - resources
    - utils
```

**`constants`**  
All consants used in your Application should be declared here.

**`errors`**  
All errors/exceptions used in your Application should be declared here.

**`middlewares`**  
All middlewares used in your Application should be declared here. See [Middlewares](#middlewares) for more information.

#### Middlewares
Middlewares can be executed before or after a request. This will be useful for cases where an action needs to be done prior to the rest of the business logic, or when you needed to do something else prior to the sending of the response.

Middlewares requires Middy to work.

**`responseHandler`**  
This middleware will be executed whenever a successful response is expected to be returned. This middleware executes *before* the response is retured.

**`errorHandler`**  
This middleware will be executed whenever an error response is expected to be returned. This middleware executes *before* the response is retured.

```js
import middy from "middy";
import responseHandler from "Middlewares/responseHandler";
import errorHandler from "Middlewares/errorHandler";

const originalHandler = async () => {
  return await new Promise((resolve) => resolve("Pong"));
};

export const handler = middy(originalHandler);

handler
  .use(responseHandler());
  .use(errorHandler());
```
Refer to `src/app/handlers/services/ping.js` for usage.

#### Error Handling

It is recommended to always throw an Error instead of returning an error as a normal response. You may create your own Error Class within the `src/app/errors/` directory.

Refer to the sample `ValidationError.js` class provided.

Refer to `src/app/errors/ValidationError.js` for usage.
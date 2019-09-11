# Serverless Templates
This repository contains a set of serverless templates to bootstrap your serverless projects.

**NOTE:** This is not an introduction to the Serverless Framework. You would already need to know how Serverless Framework works prior to using any of the templates.

## Motivation
Through the years I have created several serverless projects/microservices and come to realise that most of the base requirements are the same. With each project, I tend to copy-and-paste them and just to kickstart/bootstrap a new project.

I came to realise that Serverless supports Templates and thus, this repository is born.

## Quick Start

**Prerequisites**: Install Serverless Framework with: `npm install -g serverless`.

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
- [API](https://github.com/mosufy/serverless-templates/tree/master/api)
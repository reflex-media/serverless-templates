# Serverless Templates
This repository contains a set of serverless templates to bootstrap your serverless projects.

**NOTE:** This is not an introduction to the Serverless Framework. You would need to know how Serverless Framework works prior to using any of these templates.

## Motivation
Through the years I have created several serverless projects and microservices and come to realise that most of the basic requirements are the same. As Serverless supports Templates, this repository is born.

## Quick Start

**Prerequisites**: Install Serverless Framework with: `npm install -g serverless`.

Create Serverless project
```bash
$ sls create --template-url https://github.com/mosufy/serverless-templates/tree/master/api-light --path my-service
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

Access local url via browser or Postman (recommended): http://localhost:8181/services/ping

## Directory Structure
All templates minimally have the same base skeleton as described below.

```
├── environments
|   ├── dev.yml
|   ├── local.yml
|   ├── prod.yml
|   └── test.yml
├── scripts
└── src
    ├── app
    |   ├── handlers
    |   └── config.js
    ├── functions
    ├── resources
    └── utils
```

**environments/**  
Contains environment values stored in yaml format. Used specifically during the build process.

**scripts/**  
Contains deployment/build specific scripts.

**src/**  
Main source code for your project.

**src/app/**  
Contains application specific code.

**src/app/handlers/**  
Entry point for all events.

**src/app/config.js**  
Configuration used within your application.

**src/functions/**  
Serverless functions should be configured here.

**src/resources/**  
Serverless resources should be configured here.

**src/utils/**  
Additional Serverless files where required.

## Available Commands

**Start local**
```bash
$ yarn start
```

**Deploy**
```bash
# Deploy dev environment
$ yarn deploy-dev

# Deploy test environment
$ yarn deploy-test

# Deploy prod environment
$ yarn deploy-prod
```

**Deploy single function**
```bash
$ yarn deploy-dev -f {function_name}

# Example
$ yarn deploy-dev -f ServicePing
```

**Invoke single function**
```bash
$ yarn invoke-dev -f {function_name}

# Example
$ yarn invoke-dev -f ServicePing
```

**Tail log of a single function**
```bash
$ yarn logs-dev -f {function_name}

# Example
$ yarn logs-dev -f ServicePing
```

## Available Templates
- [api-light](https://github.com/mosufy/serverless-templates/tree/master/api-light)
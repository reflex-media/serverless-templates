# Static Website Serverless Template

[![Build Status](https://travis-ci.org/reflex-media/serverless-templates.svg?branch=master)](https://travis-ci.org/reflex-media/serverless-templates)
[![Coverage Status](https://coveralls.io/repos/github/reflex-media/serverless-templates/badge.svg?branch=master)](https://coveralls.io/github/reflex-media/serverless-templates?branch=master)

Bootstrap your next static website with React.

**Included Resources:**

- S3 Website
- Cloudfront CDN

**NOTE:** This is not an introduction to the Serverless Framework. You would already need to know how Serverless Framework works prior to using of this template.

## Quick Start

**Prerequisites**: Install Serverless Framework with: `npm install -g serverless`.

Create new project

```bash
$ sls create --template-url https://github.com/mosufy/serverless-templates/tree/master/static-website --path my-website
$ cd my-website
```

Install dependencies

```bash
$ yarn install
```

Start local

```bash
$ yarn start
```

Access local url via browser: http://localhost:3030

## Directory Structure

```
├── config
|   └── environments
|       ├── .env
|       ├── .env.local
|       ├── .env.development
|       ├── .env.staging
|       └── .env.production
├── public
├── scripts
└── src
    ├── assets
    |   ├── img
    |   └── styles
    ├── components
    |   ├── atoms
    |   ├── molecules
    |   ├── organisms
    |   └── templates
    ├── pages
    |   ├── App.js
    |   └── Home.js
    ├── config.js
    ├── index.js
    └── setupTests.js
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

**public/**  
Public folder for static website. Contains the `index.html`.

**scripts/**  
Contains Serverless deployment/build scripts.

**src/**  
Main source code for your application.

**src/assets/**  
Asset files to place here, including imagess, css, etc.

**src/components/**  
Write React components here. The structure is based on the Atomic Design Methodology. [Read more](https://blog.usejournal.com/thinking-about-react-atomically-608c865d2262).

**src/pages/**  
React pages based on the Atomic Design Methodology.

**src/config.js**  
Configuration used within React.

**src/index.js**  
Entry point for React app.

**src/setupTests/**  
Test environment configurations to be defined here.

## Available Commands

**Start local**

```bash
$ yarn start
```

**Deploy website**

```bash
$ yarn deploy -s {environment}

# Example deploy to dev environment
$ yarn deploy -s dev
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

# S3 bucket to deploy to
CLIENT_S3_BUCKETNAME="serverless-templates-static-website"

# React bundled folder to deploy
CLIENT_APP_DISTFOLDER="build"

# Cloudfront ID. Required to invalidate the Cloudfront CDN with every deployment
CLIENT_CF_ID=

# Set any configurations needed for React application. This should always be prefixed with "REACT_APP_". Refer to "src/config.js" for usage.
REACT_APP_ENV=${APP_ENV}
REACT_APP_DEBUG=${APP_DEBUG}

```

## Unit Test

This template uses Jest test framework for component testing.

All test files exist in each respective component directory as `__tests__/`.

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

Declare test environment configurations as NODE variables in `src/setupTests.js`.

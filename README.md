# Serverless Templates
This repository contains a set of serverless templates to bootstrap your serverless projects.

**NOTE:** This is not an introduction to the Serverless Framework. You would need to know how Serverless Framework works prior to using any of these templates.

## Motivation
Through the years we have created several serverless projects and microservices and come to realise that most of the basic requirements are the same. As Serverless Framework supports Templates, this repository is born.

Refer to the list of [available templates](#available-templates) to learn more of what each template provides.

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

## Available Templates
See the available templates for more in-depth documentation and usage.

- [api-light](https://github.com/mosufy/serverless-templates/tree/master/api-light)
# aws-meetup-cdk

# Prerequisites

- aws profile/credentials [configured](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-files.html) on your machine 
- nodejs and npm installed https://nodejs.org/en/download/
- aws cdk installed   ```npm install -g aws-cdk```

We also previously run:
- ```cdk init app -l typescript```
- ```cdk bootstrap```

Default readme below:

# Welcome to your CDK TypeScript project!

This is a blank project for TypeScript development with CDK.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

 * `npm run build`   compile typescript to js
 * `npm run watch`   watch for changes and compile
 * `npm run test`    perform the jest unit tests
 * `cdk deploy`      deploy this stack to your default AWS account/region
 * `cdk diff`        compare deployed stack with current state
 * `cdk synth`       emits the synthesized CloudFormation template

# Welcome to CDK TypeScript project: mid-level_dev_project!

This is a blank project for TypeScript development with CDK.

Create a Lambda that converts phone numbers to vanity numbers and save the best 5 resulting vanity numbers and the caller's number in a DynamoDB table. "Best" is defined as you see fit - explain your thoughts.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Dependancies
 * [AWS CDK](https://docs.aws.amazon.com/cdk/latest/guide/getting_started.html)

## Deployment Instructions

 * `npm run build`   compile typescript to js
 * `npm run test`    perform the jest unit tests
 * `cdk deploy`      deploy this stack to your default AWS account/region
 * `cdk synth`       emits the synthesized CloudFormation template

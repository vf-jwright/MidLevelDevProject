# Welcome to CDK TypeScript project: mid-level_dev_project!

This is a TypeScript project for Voice Foundry with CDK.

Create a Lambda that converts phone numbers to vanity numbers and save the best 5 resulting vanity numbers and the caller's number in a DynamoDB table. "Best" is defined as you see fit - explain your thoughts.


## Dependancies
 * [AWS CDK](https://docs.aws.amazon.com/cdk/latest/guide/getting_started.html)
 * All other dependancies that are involved with CDK projects (npm, aws-cli v2, IAM permissions to deploy CloudFront and create IAM roles)

## Deployment Instructions
 * `git clone https://github.com/jrwright121/MidLevelDevProject/tree/main/cdkStackforLambdaDynamoDb` clone repository 
 * `npm run deploy`  builds and deploys project

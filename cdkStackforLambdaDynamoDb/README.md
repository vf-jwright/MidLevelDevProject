# Welcome to Voice Foundry CDK TypeScript project: 
## MidLevelDevProject!

This is a TypeScript project for Voice Foundry with CDK.

Lambda that converts phone numbers to vanity numbers and save the best 5 resulting vanity numbers and the caller's number in a DynamoDB table.

## Dependencies
 * [AWS CDK](https://docs.aws.amazon.com/cdk/latest/guide/getting_started.html)
 * Node v14 or later
 * All other dependancies that are involved with CDK projects (aws-cli v2, IAM permissions to deploy CloudFront and create IAM roles)

## Deployment Instructions
Run all step in order
 1. `git clone https://github.com/jrwright121/MidLevelDevProject` - Clone repository.
 2. `cd MidLevelDevProject/cdkStackforLambdaDynamoDb/` - Progress to the cdk project
 3. `npm run deploy` - Installs CDK stack and Lambda Function dependencies then deploys CDK stack.<br />*this may take some time

`npm run deploy` Cammands in Order 
 1. `npm i`  Installs cdk node dependencies.
 3. `cd ./lambdaFunction`  - Direct to Lambda Function and build Lambda Function. 
 3. `npm i` Install Lambda Function node dependencies. 
 4. `npm run clean` Removes all previous javascript files in package. 
 5. `npm run tsc` Compiles Typescript into Javascript for Lambda Function Runtime NODEJS_12_X
 6. `cd ../` - Direct back to root CDK project
 7. `cdk synthesize` - Synthesize cdk project (creates a CloudFormation Stack to evaluate before deployment).
 8. `cdk bootstrap` - Bootstrap CDK (initialize project to AWS environment).
 9. `cdk deploy` - Deploy project to AWS.
 
 ## Output Resources
 To see output of the deployment find the stack information in CloudFormation Stack - MidLevelDevProject
  * DynamoDbTableName
  * LambdaFunctionARN

### [*Next Step (Deploy Contact Flow)](https://github.com/jrwright121/MidLevelDevProject/tree/main/connectContactFlow)

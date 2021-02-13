# Welcome to Voice Foundry CDK TypeScript project: 
## MidLevelDevProject!

This is a TypeScript project for Voice Foundry with CDK.

Lambda that converts phone numbers to vanity numbers and save the best 5 resulting vanity numbers and the caller's number in a DynamoDB table.

## Dependencies
 * [AWS CDK](https://docs.aws.amazon.com/cdk/latest/guide/getting_started.html)
 * All other dependancies that are involved with CDK projects (npm, aws-cli v2, IAM permissions to deploy CloudFront and create IAM roles)

## Deployment Instructions
(Run all step in order)
 1. `git clone https://github.com/jrwright121/MidLevelDevProject/tree/main/cdkStackforLambdaDynamoDb` - clone repository.
 2. `npm i`  installs node dependencies.
 3. `cd ./lambdaFunction && npm i` - Direct to Lambda Function and install node dependencies. 
 4. `cd ../` - Direct back to root CDK project
 5. `cdk synthesize` - Synthesize cdk project (creates a CloudFormation Stack to evaluate before deployment).
 5. `cdk bootstrap` - Bootstrap CDK (initialize project to AWS environment).
 6. `cdk deploy` - Deploy project to AWS.
 
 ## Output Resources
 To see output of the deployment find the stack information in CloudFormation Stack - MidLevelDevProject
  * Lambda Function ARN
  * DynamoDb Table Name

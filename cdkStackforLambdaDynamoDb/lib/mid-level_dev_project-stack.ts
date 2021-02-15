import * as cdk from '@aws-cdk/core';
import { Function, Runtime, AssetCode, Tracing } from "@aws-cdk/aws-lambda";
import { Table, AttributeType } from "@aws-cdk/aws-dynamodb"
import { Duration } from '@aws-cdk/core';

export class MidLevelDevProjectStack extends cdk.Stack {
  private lambdaFunction: Function;
  private dynamoDbTable: Table;
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    // Create DynamoDb Table Named VanityNumbers with partitionKey: phoneNumber and sortKey: timestamp
    this.dynamoDbTable = new Table(this, 'VanityNumbers', {
      partitionKey: {name: 'phoneNumber', type: AttributeType.STRING},
      sortKey: {name: 'timestamp', type: AttributeType.STRING}
    })
    // Create Lambda Function for Lex Bot in Contact Flow. (Or to be triggered by Contact Flow directly)
    this.lambdaFunction = new Function(this, 'convertsPhoneNumbersToVanityNumbers', {
      runtime: Runtime.NODEJS_12_X,
      code: new AssetCode("lambdaFunction"),
      timeout: Duration.seconds(30),
      handler: 'lib/index.handler',
      tracing: Tracing.ACTIVE, //personally enjoy this feature
      memorySize: 512,
      environment: {
        TableName: this.dynamoDbTable.tableName,
      }
    });
    // Adding IAM permissions for Lambda to write to dynamodb
    this.dynamoDbTable.grantReadWriteData(this.lambdaFunction)
    new cdk.CfnOutput(this, 'Lambda Function ARN', { value: this.lambdaFunction.functionArn });
    new cdk.CfnOutput(this, 'DynamoDb Table Name', { value: this.dynamoDbTable.tableName})
  }
}

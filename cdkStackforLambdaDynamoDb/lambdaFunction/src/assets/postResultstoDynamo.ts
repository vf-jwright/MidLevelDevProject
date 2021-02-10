import {DynamoDB, AWSError, Request} from 'aws-sdk';
import { PutItemOutput } from 'aws-sdk/clients/dynamodb';

const ddb = new DynamoDB.DocumentClient({region:'us-east-1'})
type threeString = [string, string, string]
export const postResultstoDynamo = async function (callerId: string, vanityWords: threeString) : Promise<Request<DynamoDB.PutItemOutput, AWSError>> {
    const params = {
        TableName: process.env.TableName? process.env.TableName : 'na',
        Item: {
            phoneNumber: callerId,
            timestamp: Date.now(),
            vanityWords: vanityWords
        }
    }
    return ddb.put(params, function(err: AWSError, data:PutItemOutput) {
        if (err) console.error(err);
        else console.info("data: ", data);
    });
}
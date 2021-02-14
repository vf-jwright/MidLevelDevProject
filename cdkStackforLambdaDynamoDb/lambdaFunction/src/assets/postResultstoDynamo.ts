/**
 * @fileoverview Post Results to DynamoDb. 
 * @author Jacob Wright
 * 
 */
import {DynamoDB, AWSError, Request} from 'aws-sdk';
import { PutItemOutput } from 'aws-sdk/clients/dynamodb';

const ddb = new DynamoDB.DocumentClient({region:'us-east-1'})
type resultsObject = {
    callerIdWord: string,
    one: string,
    two: string,
    three: string,
    four: string,
    five: string
}
export const postResultstoDynamo = async function (callerId: string, results: resultsObject) : Promise<Request<DynamoDB.PutItemOutput, AWSError>> {
    console.log('Entering postResultstoDynamo: ', callerId, JSON.stringify(results))
    const timestamp = Date.now().toString();
    const params = {
        TableName: process.env.TableName? process.env.TableName : 'na',
        Item: {
            phoneNumber: callerId,
            timestamp,
            vanityWords: JSON.stringify(results)
        }
    }
    console.log('Params: ', params)
    const postResults = await ddb.put(params, function(err: AWSError, data:PutItemOutput) {
        if (err) console.error(err);
        else console.info("data: ", data);
    });
    console.log('Post Results: ', postResults)
    return postResults
}
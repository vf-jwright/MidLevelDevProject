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
export const postResultstoDynamo = async function (callerId: string, results: resultsObject){
    console.log('Entering postResultstoDynamo: ', callerId, JSON.stringify(results))
    const timestamp = Date.now().toString();
    const params = {
        TableName: process.env.TableName? process.env.TableName : 'MidLevelDevProjectStack-VanityNumbers9448E191-1VDWADSHM57VJ',
        Item: {
            phoneNumber: callerId,
            timestamp,
            vanityWords: JSON.stringify(results)
        }
    }
    console.log('Params: ', params)
    return ddb.put(params).promise()
}
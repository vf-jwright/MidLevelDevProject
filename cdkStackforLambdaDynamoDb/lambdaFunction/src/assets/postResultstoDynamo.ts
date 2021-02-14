/**
 * @fileoverview 
 * @author Jacob Wright
 * 
 */
import {DynamoDB, AWSError, Request} from 'aws-sdk';
import { PutItemOutput } from 'aws-sdk/clients/dynamodb';

const ddb = new DynamoDB.DocumentClient({region:'us-east-1'})
type threeString = [string, string, string]
export const postResultstoDynamo = async function (callerId: string, vanityWords: threeString) : Promise<Request<DynamoDB.PutItemOutput, AWSError>> {
    console.log('Entering postResultstoDynamo: ', callerId, vanityWords.toString())
    const params = {
        TableName: process.env.TableName? process.env.TableName : 'na',
        Item: {
            phoneNumber: callerId,
            timestamp: Date.now().toString(),
            vanityWords: vanityWords.toString()
        }
    }
    return ddb.put(params, function(err: AWSError, data:PutItemOutput) {
        if (err) console.error(err);
        else console.info("data: ", data);
    });
}
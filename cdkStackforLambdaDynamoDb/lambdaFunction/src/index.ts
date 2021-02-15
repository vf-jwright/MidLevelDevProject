/**
 * @fileoverview Index of Lambda Function, organizes the data processes needed to provide Contact Flow with expected responses. 
 * @author Jacob Wright
 */
import * as AWS from 'aws-sdk';
AWS.config.update({ region: 'us-east-1' });
import {
    getOrderVanityWords,
    postResultstoDynamo,
    getNumberAsWord
} from './assets/assets'
/**
 * @param event : any - Contact Flow event expected to contain customerEndpoint with Address and Type = TELEPHONE_NUMBER
 * @returns {results}: 
 */
type resultsObject = {
    callerIdWord: string,
    one: string,
    two: string,
    three: string,
    four: string,
    five: string
}
export const handler = async function (event: any) {
    console.log("Entering handler: ", event.toString())

    // Input Validation 
    if(event.Details.ContactData.CustomerEndpoint.Type != 'TELEPHONE_NUMBER') return false
    let callerId = event.Details.ContactData.CustomerEndpoint.Address ? event.Details.ContactData.CustomerEndpoint.Address : '+15555555555'
    
    // Initializing variable to be used. 
    let firstSetVanity: string[];
    let secondSetVanity: string[];
    let thirdSetVanity: string[];
    let zeroCounter:number = 0;
    
    // Deconstructing phone number in to three main segments. (opportunities here for additional vanity words ex. 5-10 digit words) 
    const firstSet:string = callerId.substring(2,5)
    const secondSet:string = callerId.substring(5,8)
    const thirdSet:string = callerId.substring(8,12)
    
    // Looking for 0's and 1's in each segment as they will not produce nice vanity words
    // Only process each segment if they do not contain a 0 or 1 - if so return 
    // Get all Vanity Words for each segment. 
    if(firstSet.includes('0') || firstSet.includes('1')){
        console.debug('firstSet contains 0 or 1');
        const firstSetAsWord:string = getNumberAsWord(firstSet)
        zeroCounter++
        firstSetVanity = [firstSetAsWord,firstSetAsWord,firstSetAsWord,firstSetAsWord,firstSetAsWord]
    } else {
        firstSetVanity =  getOrderVanityWords(firstSet);
        console.log('firstSetVanity: ', firstSetVanity.toString())
    }
    if(secondSet.includes('0') || secondSet.includes('1')){
        console.debug('secondSet contains 0 or 1');
        const secondSetAsWord:string = getNumberAsWord(secondSet)
        zeroCounter++
        secondSetVanity = [secondSetAsWord,secondSetAsWord,secondSetAsWord,secondSetAsWord,secondSetAsWord]
    } else {
        secondSetVanity =  getOrderVanityWords(secondSet);
        console.log('secondSetVanity: ', secondSetVanity);
    } if ((thirdSet.includes('0') || thirdSet.includes('1')) && (zeroCounter == 2)){
        console.debug('All three sets include a 0 or 1');
        return false
    }
    thirdSetVanity =  getOrderVanityWords(thirdSet);
    console.log('thirdSetVanity: ', thirdSetVanity);

    const vanityWords: [string,string,string,string,string] = [
        `${firstSetVanity[0]} ${secondSetVanity[0]} ${thirdSetVanity[0]}`,
        `${firstSetVanity[1]} ${secondSetVanity[1]} ${thirdSetVanity[1]}`,
        `${firstSetVanity[2]} ${secondSetVanity[2]} ${thirdSetVanity[2]}`,
        `${firstSetVanity[3]} ${secondSetVanity[3]} ${thirdSetVanity[3]}`,
        `${firstSetVanity[4]} ${secondSetVanity[4]} ${thirdSetVanity[4]}`
    ];
    // convert callerId to words to be audible in Contact Flow
    const callerIdWord = getNumberAsWord(callerId)
    console.log('Vanity Words: ',vanityWords.toString())
    // used to post top 5 results to dynamodb and returned to Contact Flow to use top three
    const results: resultsObject = {
        callerIdWord,
        one:   vanityWords[0],
        two:   vanityWords[1],
        three: vanityWords[2],
        four:  vanityWords[3],
        five:  vanityWords[4]
    }
    // Post top five results to DynamoDb
    await postResultstoDynamo(callerId, results)
    return results
}
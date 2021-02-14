/**
 * @fileoverview Index of Lambda Function, organizes the data processes needed to provide Contact Flow with expected responses. 
 * @author Jacob Wright
 */
import * as AWS from 'aws-sdk';
AWS.config.update({ region: 'us-east-1' });
import {
    getTopThreeWords,
    postResultstoDynamo,
    getNumberAsWord
} from './assets/assets'
/**
 * @param event : any - Contact Flow event expected to contain customerEndpoint with Address and Type = TELEPHONE_NUMBER
 * @returns {{callerIdWord:string, one: string, two:string, three:string}} - callerId in word format for for Contact Flow to be in customer friendly format, three Vanity Numbers to present to customer.
 */
export const handler = async function (event: any) {
    console.log("Entering handler: ", event.toString())

    // Input Validation 
    if(event.Details.ContactData.CustomerEndpoint.Type != 'TELEPHONE_NUMBER') return false
    let callerId = event.Details.ContactData.CustomerEndpoint.Address ? event.Details.ContactData.CustomerEndpoint.Address : '+15053532338'
    
    // Initializing variable to be used. 
    type threeString = [string, string, string]
    let firstSetTopThree: threeString;
    let secondSetTopThree: threeString;
    let thirdSetTopThree: threeString;
    let zeroCounter:number = 0;
    
    // Deconstructing phone number in to three main segments. (opportunities here for additional vanity words ex. 5-10 digit words) 
    const firstSet:string = callerId.substring(2,5)
    const secondSet:string = callerId.substring(5,8)
    const thirdSet:string = callerId.substring(8,12)
    
    // Looking for 0's and 1's in each segment as they will not produce nice vanity words
    // Only process each segment if they do not contain a 0 or 1
    if(firstSet.includes('0') || firstSet.includes('1')){
        console.debug('firstSet contains 0 or 1');
        zeroCounter++
        firstSetTopThree = [getNumberAsWord(firstSet),getNumberAsWord(firstSet),getNumberAsWord(firstSet)]
    } else {
        firstSetTopThree =  getTopThreeWords(firstSet);
        console.log('firstSetTopThree: ', firstSetTopThree.toString())
    }
    if(secondSet.includes('0') || secondSet.includes('1')){
        console.debug('secondSet contains 0 or 1');
        zeroCounter++
        secondSetTopThree = [getNumberAsWord(secondSet),getNumberAsWord(secondSet),getNumberAsWord(secondSet)]
    } else {
        secondSetTopThree =  getTopThreeWords(secondSet);
        console.log('secondSetTopThree: ', secondSetTopThree);
    } if ((thirdSet.includes('0') || thirdSet.includes('1')) && (zeroCounter == 2)){
        console.debug('All three sets include a 0 or 1');
        return false
    }
    thirdSetTopThree =  getTopThreeWords(thirdSet);
    console.log('thirdSetTopThree: ', thirdSetTopThree);

    const vanityWords: threeString = [
        `${firstSetTopThree[0]} ${secondSetTopThree[0]} ${thirdSetTopThree[0]}`,
        `${firstSetTopThree[0]} ${secondSetTopThree[0]} ${thirdSetTopThree[0]}`,
        `${firstSetTopThree[0]} ${secondSetTopThree[0]} ${thirdSetTopThree[0]}`
    ];

    await postResultstoDynamo(callerId, vanityWords)
    const callerIdWord = getNumberAsWord(callerId)
    console.log(JSON.stringify({
        callerIdWord,
        one: firstSetTopThree[0] + ' '  + secondSetTopThree[0] + ' ' + thirdSetTopThree[0],
        two: firstSetTopThree[1] + ' ' + secondSetTopThree[1] + ' ' + thirdSetTopThree[1],
        three: firstSetTopThree[2] + ' ' + secondSetTopThree[2] + ' ' + thirdSetTopThree[2],
    }))

    return {
        callerIdWord,
        one: firstSetTopThree[0] + ' '  + secondSetTopThree[0] + ' ' + thirdSetTopThree[0],
        two: firstSetTopThree[1] + ' ' + secondSetTopThree[1] + ' ' + thirdSetTopThree[1],
        three: firstSetTopThree[2] + ' ' + secondSetTopThree[2] + ' ' + thirdSetTopThree[2],
    }
}
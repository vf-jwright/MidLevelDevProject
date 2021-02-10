import * as AWS from 'aws-sdk';
AWS.config.update({ region: 'us-east-1' });
import {
    getTopThreeWords,
    postResultstoDynamo,
    getNumberAsWord
} from './assets/assets'
export const handler = async function (event: any) {
    if(event.Details.ContactData.CustomerEndpoint.Type != 'TELEPHONE_NUMBER') return false
    let callerId = event.Details.ContactData.CustomerEndpoint.Address ? event.Details.ContactData.CustomerEndpoint.Address : '+15053532338'
    const firstSet:string = callerId.substring(2,5)
    const secondSet:string = callerId.substring(5,8)
    const thirdSet:string = callerId.substring(8,12)
    type threeString = [string, string, string]
    let firstSetTopThree: threeString;
    let secondSetTopThree: threeString;
    let thridsetTopThree: threeString;
    let zeroCounter:number = 0;
    if(firstSet.includes('0') || firstSet.includes('1')){
        zeroCounter++
        firstSetTopThree = [getNumberAsWord(firstSet),getNumberAsWord(firstSet),getNumberAsWord(firstSet)]
    } else {
        firstSetTopThree =  getTopThreeWords(firstSet);
    }
    if(secondSet.includes('0') || secondSet.includes('1')){
        zeroCounter++
        secondSetTopThree = [getNumberAsWord(secondSet),getNumberAsWord(secondSet),getNumberAsWord(secondSet)]
    } else {
        secondSetTopThree =  getTopThreeWords(secondSet);
    } if (thirdSet.includes('0') || thirdSet.includes('1')){
        if(zeroCounter == 2) return false
    }
    thridsetTopThree =  getTopThreeWords(thirdSet);

    const vanityWords: threeString = [
        `${firstSetTopThree[0]} ${secondSetTopThree[0]} ${thridsetTopThree[0]}`,
        `${firstSetTopThree[0]} ${secondSetTopThree[0]} ${thridsetTopThree[0]}`,
        `${firstSetTopThree[0]} ${secondSetTopThree[0]} ${thridsetTopThree[0]}`
    ];

    // await postResultstoDynamo(callerId, topThreeVanityWords)
    const callerIdWord = getNumberAsWord(callerId)
    console.log(JSON.stringify({
        callerIdWord,
        one: firstSetTopThree[0] + ' '  + secondSetTopThree[0] + ' ' + thridsetTopThree[0],
        two: firstSetTopThree[1] + ' ' + secondSetTopThree[1] + ' ' + thridsetTopThree[1],
        three: firstSetTopThree[2] + ' ' + secondSetTopThree[2] + ' ' + thridsetTopThree[2],
    }))

    return {
        callerIdWord,
        one: firstSetTopThree[0] + ' '  + secondSetTopThree[0] + ' ' + thridsetTopThree[0],
        two: firstSetTopThree[1] + ' ' + secondSetTopThree[1] + ' ' + thridsetTopThree[1],
        three: firstSetTopThree[2] + ' ' + secondSetTopThree[2] + ' ' + thridsetTopThree[2],
    }
}
const event = require('../events/event.json')
exports.handler(event)
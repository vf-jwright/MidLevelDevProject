/**
 * @fileoverview Converts a string of numbers to words for each digit. This is to make number audible in Contact Flow
 * @author Jacob Wright
 * 
 */
export const getNumberAsWord = function (number: string) : string {
    console.log('Entered getNumberAsWord: ', number)
    const numberToWord = {
        1: 'one ',
        2: 'two ',
        3: 'three ',
        4: 'four ',
        5: 'five ',
        6: 'six ',
        7: 'seven ',
        8: 'eight ',
        9: 'nine ',
        0: 'zero ',
    }
    let word = '';
    if(number.length == 12) {
        number = number.slice(2)
    }
    const numberArray = number.split('')
    numberArray.map((letter:string)=> {
        // @ts-ignore
        word = word.concat(numberToWord[letter])
    })
    return word
}
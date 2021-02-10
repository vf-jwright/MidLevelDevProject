export const getNumberAsWord = function (number: string) : string {
    const numbertoWord = {
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
        word = word.concat(numbertoWord[letter])
    })
    return word
}
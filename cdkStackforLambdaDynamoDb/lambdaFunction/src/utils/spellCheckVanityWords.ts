/**
 * @fileoverview This function takes an array of words and returns an array of words that are considered spelled correctly.
 * @author Jacob Wright
 * 
 */
const spellChecker = require('spell-checker-js')
spellChecker.load('en')
export const spellCheckVanityWords = function (vanityWords: string[]) : string[] {
    console.debug("Entering spellCheckVanityWords")
    let output:string[] = [];
    for(const word of vanityWords){
        let value = spellChecker.check(word)
        if(value.length == 0){
            output.push(word)
        }
    }
    return output
}

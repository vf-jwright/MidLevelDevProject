/**
 * @fileoverview This function takes a string of number digits and returns at least five strings to provide Contact Flow
 * @author Jacob Wright
 * 
 */
import {getAllVanityWords, spellCheckVanityWords, getNumberAsWord} from './utils'
export const getOrderVanityWords = function (input: string): string[] {
    console.log('Entering getTopThreeWords: ', input)
    // convert number digits to all possible letter combinations from a phone key pad 
    const vanityWords: string[] = getAllVanityWords(input);
    // spell check each combination this is the primary scoring method for this application
    const spellcheckedWords: string[] = spellCheckVanityWords(vanityWords);
    // used to make audible for user in Contact Flow
    const inputAsWord: string = getNumberAsWord(input)
    // used to make sure returns array of length 5 at least 
    const preLoad:string[] = [inputAsWord,inputAsWord,inputAsWord,inputAsWord,inputAsWord]
    // so that every experience isn't return the same alphabetical order
    const shuffledWords: string[] = shuffleArray(spellcheckedWords)
    // attach preloaded to shuffled spellchecked words
    const orderedVanityWords: string[] = shuffledWords.concat(preLoad)
    
    return orderedVanityWords
}

const shuffleArray = function (array:string[]):string[] {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array
}

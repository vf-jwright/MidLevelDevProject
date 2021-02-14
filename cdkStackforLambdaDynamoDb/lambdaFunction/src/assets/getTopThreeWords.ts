/**
 * @fileoverview 
 * @author Jacob Wright
 * 
 */
import {getAllVanityWords, spellCheckVanityWords, getNumberAsWord} from './assets'
export const getTopThreeWords = function (input: string): [string,string,string] {
    console.log('Entering getTopThreeWords: ', input)
    let combinedArray: string[];
    const vanityWords: string[] = getAllVanityWords(input);
    const spellcheckedWords: string[] = spellCheckVanityWords(vanityWords)
    console.log('spellcheckedWords: ', spellcheckedWords)
    if(spellcheckedWords.length >= 3){
        console.debug('spellcheckedWords >= 3');
        let array = shuffleArray(spellcheckedWords)
        // @ts-ignore
        return array.slice(0,3)
    }
    
    if ((input.length == 3) && (spellcheckedWords.length < 3)){
        console.debug('(input.length == 3) && (spellcheckedWords.length < 3)');
        combinedArray = shuffleArray(spellcheckedWords).concat([getNumberAsWord(input),getNumberAsWord(input),getNumberAsWord(input)])
    } else {
        console.log('Else  ((input.length == 3) && (spellcheckedWords.length < 3))')
        combinedArray= shuffleArray(spellcheckedWords).concat(shuffleArray(vanityWords))
    }
    // @ts-ignore
    return combinedArray.slice(0,3)
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
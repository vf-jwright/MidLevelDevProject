const spellChecker = require('spell-checker-js')
spellChecker.load('en')
export const spellCheckVanityWords = function (vanityWords: string[]) : string[] {
    let output:string[] = [];
    for(const word of vanityWords){
        let value = spellChecker.check(word)
        if(value.length == 0){
            output.push(word)
        }
    }
    return output
}

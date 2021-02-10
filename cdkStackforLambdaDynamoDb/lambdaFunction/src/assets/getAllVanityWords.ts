export const getAllVanityWords = function (input: string):string[]  {
    let number = input.split('')
    let hashTable = {
        '0': ['0'],
        '1': ['1'],
        "2": ["a", "b", "c"],
        "3": ["d", "e", "f"],
        "4": ["g", "h", "i"],
        "5": ["j", "k", "l"],
        "6": ["m", "n", "o"],
        "7": ["p", "q", "r", "s"],
        "8": ["t", "u", "v"],
        "9": ["w", "x", "y", "z"]
    }
    let ans: string[] = [];
    var backtrack = function(combo: string, digits:string[]) {
        if (digits.length === 0) {
            ans.push(combo)
        } else {
            // @ts-ignore
            hashTable[digits[0]].forEach(letter => {
                backtrack(`${combo}${letter}`, digits.slice(1))
            })
        }
    }
    backtrack('',number)
    return ans
}

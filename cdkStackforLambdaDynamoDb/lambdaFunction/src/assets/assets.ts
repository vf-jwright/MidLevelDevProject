/**
 * @fileoverview This script imports and exports all functions to be used from any other script easily. 
 * @author Jacob Wright
 * 
 */
import { getAllVanityWords } from './getAllVanityWords';
import { spellCheckVanityWords } from './spellCheckVanityWords';
import { postResultstoDynamo } from './postResultstoDynamo';
import { getNumberAsWord } from './getNumberAsWord';
import { getOrderVanityWords } from './getOrderVanityWords';
export { 
    getAllVanityWords,
    spellCheckVanityWords,
    postResultstoDynamo,
    getNumberAsWord,
    getOrderVanityWords
};
import { isString } from 'util/typing'
import { parseHeader } from './markdown.header'

/**
 * This method will parse markdown text to the intermediate block structure
 * @param {*} markdown
 * @return {[{*}]} an intermediate block structure is returned
 */
export const parse = (markdown, strict = false) => {
    if(!markdown || isString(markdown) === false) return { };

    let structure = []

    const lines = markdown.split("\n");
    for(let index = 0; index < lines.length; index++) {
        parseLine(lines, index, structure, strict)
    }

    return structure;
}

/**
 * This method parses an individual line
 */
const parseLine = (lines, index, structure, strict) => {

    // Check if we are dealing with a header
    if(parseHeader(lines, index, structure, strict) === true) return;

    // nothing fired, we are a parsing within a paragraph
    parseParagraph(lines,index, structure);
}

const parseParagraph = (lines, index, structure) => {

    if(structure.length === 0 || structure[structure.length -1].type !== "p") {
        structure.push({type : "p", text : '' })
    }

    let paragraph = structure[structure.length - 1];
    const line = lines[index];
    if(paragraph.text === '' && line === '') return;

    if(line === '') paragraph.text +=  "\n";
    else paragraph.text += line;
}


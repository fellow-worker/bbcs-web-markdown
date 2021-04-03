import { ParseError } from './markdown.error'

export const parseHeader = (lines, index, structure, strict = false) => {

    // if the line starts with the alternative header, there is already dealt with the header
    const line = lines[index];
    if(line.startsWith("==") || line.startsWith("--")) return true;

    // Check if is an header
    const indication = isHeader(lines,index);
    switch(indication) {
        case 1 :
            // normal style header
            const count = line.indexOf(' ');
            if(strict && lines.length > index + 1 && lines[index + 1] !== '') throw new ParseError(index + 1, `line ${index + 2}: expecting blank line after header.`);
            structure.push({ type :"h", level : Math.min(count, 6), text : line.substr(count + 1) });
            return true;
        case 2:
            if(strict && lines.length > index + 2 && lines[index + 2] !== '') throw new ParseError(index + 2, `line ${index + 3}: expecting blank line after header.`);
            structure.push({ type :"h", level : 1, text : line });
            return true;
        case 3:
            if(strict && lines.length > index + 2 && lines[index + 2] !== '') throw new ParseError(index + 2, `line ${index + 3}: expecting blank line after header.`);
            structure.push({ type :"h", level : 2, text : line });
            return true;
        default  : return false;
    }
}

/**
 * Returns if this is a header and if so which kind
 * @returns int, 0 : no header, 1 standard header, 2 alternative h1, 3 alternative 3
 */
const isHeader = (lines, index) => {
    if(lines[index].charAt(0) === "#") return 1;
    if(index === lines.length - 1) return 0;
    if(lines[index + 1].startsWith("==")) return 2;
    if(lines[index + 1].startsWith("--")) return 3;
    return 0;
}
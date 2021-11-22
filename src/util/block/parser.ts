import { BlockType, Document, Block } from "@/types";

const indent = "    ";

export const parse = (text : string) => {
    return {
        blocks : parseBlocks(text, false),
        footnotes : getRefs(text)
    } as Document;
}

export const parseBlocks = (text : string, hasParent : boolean) => {
    if(!text) return [];

    // Do text cleanup
    const textBlocks = text
        .replace(/\r/g,'')
        .replace(/\n{3,}/g,"\n\n")
        .trim().split("\n\n");

    const blocks = [] as Block[];
    let previous = null as Block | null;

    textBlocks.forEach(text => {

        const block = parseBlock(text, hasParent);

        // Dealing with the special case of footnotes and their indenting
        if(previous?.type === BlockType.Footnote && text.startsWith(indent)) {
            const child = parseBlock(text, true);
            return previous.blocks?.push(child);
        }

        // General case
        previous = block;
        return blocks.push(block);
    })

    return blocks;
}

const parseBlock = (text : string, hasParent : boolean) => {
    let block = { type : getBlockType(text, hasParent), text : text } as Block;

    switch(block.type) {

        // BlockQuotes are special since they can have blocks within them.
        case BlockType.BlockQuote:
            const content = text.replace(/\n>/g,"\n").substr(1);
            block.blocks = parseBlocks(content, true);
            break;

        // Footnotes are special since they can have indented blocks
        case BlockType.Footnote:
            block.text = text.substr(2, text.indexOf(']') - 2);
            const paragraph = { type : BlockType.Paragraph, text : text.substr(text.indexOf(" ") +1) }
            block.blocks = [ paragraph ]
    }

    return block;
}

const getBlockType = (text : string, hasParent : boolean) => {

    if(!hasParent && isHeader(text)) return BlockType.Header;
    if(!hasParent && isAltHeader(text)) return BlockType.AltHeader;
    if(!hasParent && isBlockQuote(text)) return BlockType.BlockQuote;
    if(isOrderedList(text)) return BlockType.OrderedList;
    if(isUnorderedList(text)) return BlockType.UnorderedList;
    if(isCode(text)) return BlockType.Code;
    if(!hasParent && isHorizontalLine(text)) return BlockType.HorizontalLine;
    if(isClear(text)) return BlockType.Clear;
    if(isFootnote(text)) return BlockType.Footnote;

    return BlockType.Paragraph
}

const isHeader = (text : string) => {
    // A header should start with 1 till 6 # and be a single line
    return text.indexOf("\n") === -1 && /^#{1,6} /.test(text);
}

const isAltHeader = (text : string) => {
    // An alt header must have 2 lines.
    // The second should have 3 or more- for an H1 or 3 or more = for an H2
    const count = (text.match(/\n/g) || []).length;
    if(count !== 1) return false;
    return /\n-{3,}$/.test(text) || /\n={3,}$/.test(text);
}

const isBlockQuote = (text : string) => {
    return startsEveryLineWith(text,/^>/);
}

const isOrderedList = (text : string) => {
    return startsEveryLineWith(text,/^ *\d+./);
}

const isUnorderedList = (text : string) => {
    return startsEveryLineWith(text,/^ *\* /) ||
           startsEveryLineWith(text,/^ *- /) ||
           startsEveryLineWith(text,/^ *\+ /);
}

const startsEveryLineWith = (text : string, regexp : RegExp) => {
    const lines = text.split("\n");
    for(let index = 0; index < lines.length; index++) {
        if(!regexp.test(lines[index])) return false;
    }
    return true;
}

const isCode = (text :string) => {
    if(text.length < 2) return false;
   return /^`/g.test(text) && /`$/g.test(text)
}

const isHorizontalLine = (text :string) => {
    return /^\*{3,}$/g.test(text) || /^_{3,}$/g.test(text) || /^-{3,}$/g.test(text);
}

const isClear = (text : string) => {
    return text === "[clear]";
}

const isFootnote = (text : string) => {
    if(text.length < 5) return false;
    return /^\[\^.+?\]: /g.test(text)
}

const getRefs = (text : string) => {

    const regexp = /\[\^.+?\]: /g;
    let match = null as null | RegExpExecArray
    const labels = [] as string[];

    while((match=regexp.exec(text)) !== null) {
        const label = match[0].substr(2,match[0].length - 5);
        labels.push(label);
    }

    return labels;
}
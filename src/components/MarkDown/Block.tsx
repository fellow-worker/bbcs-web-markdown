import * as Blocks from './Blocks'

export const Block = (props : { text : string, inner : boolean}) => {

    const { text, inner } = props;
    if(!text || text.trim() === "") return null;

    // Now blocks have to be detected

    if(isHeader(text)) return <Blocks.Header text={text} />
    if(isAltHeader(text)) return <Blocks.AltHeader text={text} />
    if(isBlockQuote(text)) return <Blocks.BlockQuote text={text} />
    if(isOrderedList(text)) return <Blocks.OrderedList text={text} />
    if(isUnorderedList(text)) return <Blocks.UnorderedList text={text} />
    if(!inner && isCode(text)) return <Blocks.Code text={text} />
    if(!inner && isHorizontalLine(text)) return <Blocks.HorizontalLine />
    if(isClear(text)) return <Blocks.Clear />

    // Default we are dealing with a paragraph
    return <Blocks.Paragraph text={text} />
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

const isClear = (text :string) => {
    return text === "[clear]";
}
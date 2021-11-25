import { chapters } from './chapters'
import { books } from './books'
import { Book, VerseReference, InlineType } from 'types'

// a regexp to test for chapter:verse
const regChapterVerse = new RegExp("^[1-9]{1}[0-9]*[:]{1}[1-9]{1}[0-9]*$");

// a regexp to test for verse
const regVerse = new RegExp("^[1-9]{1}[0-9]*");

const getNumberOfChapters = (abbreviation : string) => {

    if(!chapters.has(abbreviation)) return - 1;
    return chapters.get(abbreviation);
    };

/**
 * Parses the text and replaces the found verses references
 * @param {string} text The text to parse
 * @return string Parsed text
 */
export const parse = (text : string) => {

    if (!text || text === "") return [];

    // select the book list and parse it
    return parseBooks(text).sort((a,b) => a.index - b.index);
};

/**
 * Parses the text and replaces the found verses references
 * @param {string} text The text to parse
 * @param {[{abr:string,term:string,ignorePrefixes}]} books
 * @return string Parsed text
 */
const parseBooks = (text : string) => {

    const references = [] as VerseReference[]

    books.forEach(function(book) {
        let start = 0;
        let index = text.indexOf(book.term + " ",start);
        while(index !== -1) {

            // Check if it has a prefix that should be ignored. This is the case in the 'Johannes' case because
            // 'Johannes' to be a subset of '1 Johannes'
            const ignore = ignoreForPrefix(book,text,index);

            // parse the reference
            if(ignore === true) start = index + 1;
            else {
                const reference = parseReference(book,text,index);
                text = reference.text;
                start = reference.start;

                if(reference.ref) {
                    const verseRef = {...reference, index, ref : reference.ref, type : InlineType.Verse}
                    references.push(verseRef);
                }
            }

            // search for the next
            index = text.indexOf(book.term + " ",start);
        }
    });
    return references;
};

/**
 * this method determines if we are dealing with a prefix book
 * @param {*} book
 * @param {*} text
 * @param {*} index
 */
const ignoreForPrefix = (book : Book, text : string, index : number) => {

    if(!book || !book.ignorePrefixes) return false;

    // simple check if the given index has prefix that matches the given prefix
     for(let prefixIndex = 0;  prefixIndex < book.ignorePrefixes.length; prefixIndex++) {
        const prefix = book.ignorePrefixes[prefixIndex];

        if(index - prefix.length > -1) {
            const textPrefix = text.substr(index - prefix.length,prefix.length);
            if(textPrefix === prefix) return true;
        }
    }

    return false;
}

function parseReference (book : Book, text : string, index : number) : { start: number, text: string, length : number, ref? : string } {

    // first check if the pattern matches: {book name}{space}{digit}
    const digitRegexp = new RegExp(/^[0-9]?$/);
    const start = index + book.term.length;
    if(text[start] !== ' ') return { start: start,text: text, length : 0};
    if(digitRegexp.test(text[start + 1]) === false) return { start: start,text: text, length : 0};

    // Extracts the verse reference, first set is finding the terminator
    let end = start + 1;

    // In first instance, finding the end for the reference was done with a terminator look up. However, this
    // proved issues with verses like Romans 1:8a, therefore now a sliding growing window approach is used
    let terminated = false;
    while(terminated === false) {
        const char = text[end];
        if(digitRegexp.test(char) === true) end++;
        else if(char === ':' || char === ',' || char === '-') end++;
        else terminated = true;
    }

    // If the last character is a comma or colon , ignored that as well
    if(text[end] === ',') end--;
    if(text[end] === ':') end--;
    if(text[end] === ' ' && text[end - 1] === ',') end--;
    if(text[end] === ' ' && text[end - 1] === ':') end--;
    if(end === start + 1) return { start: start,text: text, length : 0};

    // now the text can be replaced
    const head = text.substring(0,index);
    const tail = text.substring(end);
    const ref = text.substring(start,end).trim();
    const parsed = parseVerseReference(book,ref);

    // and return the result
    return {
        start : start + parsed.text.length,
        length : parsed.text.length,
        text: head + parsed.text + tail,
        ref : parsed.ref
    }
};

/**
 * Parses a verse reference like 5:1,4.7
 * @param versesText The reference text to parse
 * @param book The book this reference is from
 */
const parseVerseReference = (book : Book, versesText : string) => {

    // when dealing with one chapter books implicit add the chapter
    const bookNumbers = getNumberOfChapters(book.abr);
    if(!bookNumbers) return { text : versesText };

    let refText = versesText;
    if(bookNumbers === 1) refText = "1:" + versesText;

    // split the references with comma's. The first entry ALWAYS should contain the chapter
    // {[range]Reference},{[range]Reference},{[range]Reference}
    const rangeReferences = refText.split(',');
    if(rangeReferences.length === 0) return { text : versesText };

    // The range reference does not contains a colon a whole chapter is referenced
    // Fix for BIJ-47
    if(rangeReferences[0].indexOf(':') === -1) {
        const chapter = parseInt(versesText);
        if(isNaN(chapter) || chapter > bookNumbers) return { text : versesText };
        return { text : book.term + " " + versesText, ref : book.abr + "|" + chapter };
    }

    // create the references
    let chapter = -1;
    const verses = [];

    // now loop through each part and check if following the correct syntax
    for(let r = 0; r < rangeReferences.length; r++) {
        const rangeReference =  parseRangeReference(rangeReferences[r],chapter);
        if(rangeReference.chapter === -1) return { text : versesText };
        chapter = rangeReference.chapter;
        verses.push(book.abr + "|" + rangeReference.reference);
    }

    // Determine what to return
    if(verses.length < 1) return { text : versesText };
    else return  { text : book.term + " " + versesText, ref : verses.join(',') };
};

/**
 * parses the rangeReference into a fully range reference (thus 2:1-3 become 2:1-2:3)
 * @param {string} rangeReference
 * @param {int} chapter
 * @return {{chapter:int,reference:string}}
 */
 const parseRangeReference = (rangeReference : string, chapter : number) => {
    // split based on the range
    const references = rangeReference.split('-');
    let startRange = '';
    let endRange = '';

    // if there is no chapter, it's an error, if the range is to long return
    if(chapter === -1 && references[0].indexOf(":") === -1) return {chapter:-1,reference:''};
    if(references.length > 2 || references.length < 1) return {chapter:-1,reference:''};

    // case 1) chapter:verse
    if(regChapterVerse.test(references[0]) === true) {
        chapter = parseInt(references[0].substring(0,references[0].indexOf(':')));
        startRange = references[0];
    }

    // case 2) verse
    else if(regVerse.test(references[0]) === true) {
        startRange = chapter + ":" + references[0];
    }

    // a range with chapter:verse as second
    if(references.length === 2 &&  regChapterVerse.test(references[1]) === true) {
        chapter = parseInt(references[1].substring(0,references[1].indexOf(':')));
        endRange = references[1];
    }

    // a range with verse as second
    else if(regVerse.test(references[1]) === true) {
        endRange = chapter + ":" + references[1];
    }

    // check what to return
    if(chapter === -1 || startRange === '') return {chapter:-1,reference:''};
    else if(endRange === '') return {chapter:chapter,reference:startRange};
    else return {chapter:chapter,reference:startRange + "-" + endRange};
};
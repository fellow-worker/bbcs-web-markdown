import { BookList } from './index';


export const reduce = (results) => {
    if(results === null) return [];
    let reduced = [];
    results.forEach(result => {
        result.ranges.forEach(range => {
            const value  = {
                start : result.start,
                end : result.end,
                input : result.input,
                chapter : range.chapter,
                verse : range.verse,
            };
            reduced.push(value);
        });
    });
    return reduced.sort((a,b) => a.start - b.start);
}

/**
 * Parses the text and replaces the found verses references
 * @param {string} text The text to parse
 * @return string Parsed text
 */
 export const parse = (text, language = 'nl') => {

    if ((typeof text === 'string' || text instanceof String) === false) return text;

    // select the book list and parse it
    return parseBooks(text,BookList);
};

/**
 * Parses the text and replaces the found verses references
 * @param {string} text The text to parse
 * @param {[{abr:string,term:string,ignorePrefixes}]} books
 * @return string Parsed text
 */
const parseBooks = (text,books) => {
    let results = [];
    books.forEach(book => {
        const regexp = RegExp(`${book.term}[ ][1-9][0-9:\\-,a-z]*[: .\\])\\};]+`,'g');
        let match;
        while(match = regexp.exec(text + " ")) {
            const result = parseMatch(match, text, book);
            if(result !== null) results.push(result);
        }
    });

    return (results.length !== 0) ? results : null;
};

const parseMatch = (match, text, book) => {
    let result = handlePrefixes(match, text, book);
    if(result === null) return null;
    const parsed = parseReference(result, book);
    return (parsed.ranges.length !== 0) ? parsed : null;
}

const handlePrefixes = (match, text, book) => {

    let input = match[0].substr(0, match[0].length - 1);
    if(input.endsWith(':')) input = input.substr(0,input.length - 1);
    const end = input.length + match.index;
    const result = {
        start : match.index,
        end : end,
        input : input,
        book : book.abr,
        ref : input.substring(book.term.length + 1, end)
    };

    if(!book.ignorePrefixes) return result;

    const hasPrefix = book.ignorePrefixes.some(prefix => {
        let prefixStart = result.start - prefix.length;
        if(prefixStart < 0) return false;
        return text.substr(prefixStart, prefix.length) === prefix;
    })

    return (hasPrefix) ? null : result;
}

const parseReference = (result, book) => {

    // Add a chapter index to single chapter books
    if(book.chapters === 1 && result.ref.includes(':') === false) result.ref = "1:" + result.ref;

    // Splitting based on ,
    let ranges = [];
    const refs = result.ref.split(',');
    let previous = null;
    refs.forEach(ref => {
        previous = parseRange(ref, book, previous);
        if(previous === null) return;
        ranges.push(previous);
    })

    return {...result, ranges};
}

const parseRange = (ref, book, previous) => {
    // range are alway in the form of chapter:verse[-[chapter:]end]
    const parts = ref.split('-');
    if(parts.length === 0) return null;

    // single verses
    const start = parseSingleVerse(parts[0], book, previous);
    if(!start) return null;
    if(parts.length === 1) return start;

    // Illegal format
    if(parts.length !== 2) return null;

    const end = parseSingleVerse(parts[1], book, start);
    if(!end) return null;

    return {
        chapter : { start : start.chapter.start, end : end.chapter.end },
        verse : { start : start.verse.start, end : end.verse.end }
    };
}

const parseSingleVerse = (ref, book, previous) => {
    const range = parseChapterVerse(ref);

    if(range === null) return null;
    if(!range.chapter && previous === null) return null;

    const chapter = (range.chapter) ? range.chapter : previous.chapter.end;
    if(chapter > book.chapters) return null;
    return { chapter : { start : chapter, end : chapter}, verse : { start : range.verse, end : range.verse} };
}

const parseChapterVerse = (ref) => {
    // get the parts of the reference
    const parts = ref.split(':');
    let verse, chapter;

    // deal with verses without chapter
    if(parts.length === 1) {

        verse = parseInt(ref);
        if(isNaN(verse)) return null;
        return { verse };
    }

    if(parts.length !== 2) return null;

    chapter = parseInt(parts[0]);
    verse = parseInt(parts[1]);
    if(isNaN(verse) || isNaN(chapter)) return null;

    return { verse, chapter}
}
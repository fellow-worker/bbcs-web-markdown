import { parse, reduce } from './parser'

describe("Parser", () => {

    it("Non-Reference-Text", () => {
        const result = parse("text","nl");
        expect(result).toBe(null);
    });

    it("Non-Reference-Text - book only", () => {
        const result = parse("text Ruth","nl");
        expect(result).toBe(null);
    });

    it("Chapter outside range - Ruth 5:2", () => {
        const reference = "Ruth 5:2";
        const result = parse(reference,"nl");
        expect(result).toBe(null);
    });

    it("Simple Reference - Ruth 1:2 - space terminator", () => {
        const reference = "Ruth 1:2 a";
        const result = parse(reference,"nl");
        singleVerseCheck(result);
    });

    it("Simple Reference - Ruth 1:2 - dot terminator", () => {
        const reference = "Ruth 1:2.";
        const result = parse(reference,"nl");
        singleVerseCheck(result);
    });

    it("Simple Reference - Ruth 1:2 - semicolon terminator", () => {
        const reference = "Ruth 1:2;";
        const result = parse(reference,"nl");
        singleVerseCheck(result);
    });

    it("Simple Reference - Ruth 1:2 - colon terminator", () => {
        const reference = "Ruth 1:2:";
        const result = parse(reference,"nl");
        singleVerseCheck(result);
    });

    it("Simple Reference - Ruth 1:2 - bracket terminator", () => {
        const reference = "(Ruth 1:2)";
        const result = parse(reference,"nl");
        singleVerseCheck(result);
    });

    it("Simple Reference - Genesis 18:2 - in sentence dot terminator", () => {
        const reference = "De Heer riep Abraham in Genesis 18:2.";
        const result = parse(reference,"nl");
        singleRangeCheck(result, "gen", 18, 2, 18, 2);
    });

    it("Range Reference - Ruth 1:2-4 - local chapter - space terminator", () => {
        const reference = "Ruth 1:2-4 ";
        const result = parse(reference,"nl");
        singleRangeCheck(result, "rut", 1, 2, 1, 4);
    });

    it("Range Reference - Ruth 1:2-4 - local chapter - dot terminator", () => {
        const reference = "Ruth 1:2-4.";
        const result = parse(reference,"nl");
        singleRangeCheck(result, "rut", 1, 2, 1, 4);
    });

    it("Range Reference - Ruth 1:2-4 - local chapter - semicolon terminator", () => {
        const reference = "Ruth 1:2-4;";
        const result = parse(reference,"nl");
        singleRangeCheck(result, "rut", 1, 2, 1, 4);
    });

    it("Range Reference - Ruth 1:2-3:4 - remote chapter - space terminator", () => {
        const reference = "Ruth 1:2-3:4 ";
        const result = parse(reference,"nl");
        singleRangeCheck(result, "rut", 1, 2, 3, 4);
    });

    it("Range Reference - Ruth 1:2-4:4 - remote chapter - dot terminator", () => {
        var reference = "Ruth 1:2-4:4.";
        const result = parse(reference,"nl");
        singleRangeCheck(result, "rut", 1, 2, 4, 4);
    });

    it("Range Reference - Ruth 1:2-2:4 - remote chapter - semicolon terminator", () => {
        const reference = "Ruth 1:2-2:4;";
        const result = parse(reference,"nl");
        singleRangeCheck(result, "rut", 1, 2, 2, 4);
    });

    it("Merger Reference - Ruth 1:2,3 - local chapter -  dot terminator", () => {
        const reference = "Ruth 1:2,3.";
        const result = parse(reference,"nl");
        rangeCheck(result,0, 'rut',1,2,1,2);
        rangeCheck(result,1, 'rut',1,3,1,3);

    });

    it("Merger Reference - Ruth 1:2,3 - local chapter - semicolon terminator", () => {
        const reference = "Ruth 1:2,3;";
        const result = parse(reference,"nl");
        rangeCheck(result,0, 'rut',1,2,1,2);
        rangeCheck(result,1, 'rut',1,3,1,3);
    });

    it("Merger Reference - Ruth 1:2,3 - local chapter -  bracket terminator", () => {
        const reference = "(Ruth 1:2,3)";
        const result = parse(reference,"nl");
        rangeCheck(result,0, 'rut',1,2,1,2);
        rangeCheck(result,1, 'rut',1,3,1,3);
    });

    it("Merger Reference - Ruth 1:2,4:3 - remote chapter -  dot terminator", () => {
        const reference = "Ruth 1:2,4:3.";
        const result = parse(reference,"nl");
        rangeCheck(result,0, 'rut',1,2,1,2);
        rangeCheck(result,1, 'rut',4,3,4,3);
    });

    it("Merger Reference - Ruth 1:2,3:3 - remote chapter - semicolon terminator", () => {
        const reference = "Ruth 1:2,3:3;";
        const result = parse(reference,"nl");
        rangeCheck(result,0, 'rut',1,2,1,2);
        rangeCheck(result,1, 'rut',3,3,3,3);
    });

    it("Merger Reference - Ruth 1:2,3:3 - remote chapter -  bracket terminator", () => {
        const reference = "(Ruth 1:2,3:3)";
        const result = parse(reference,"nl");
        rangeCheck(result,0, 'rut',1,2,1,2);
        rangeCheck(result,1, 'rut',3,3,3,3);
    });

    it("Merger Range Reference - Ruth 1:2-4,4:3-5 - local chapter -  sentence", () => {
        const reference = "lees in Ruth 1:2-4,4:3-5 over Boas";
        const result = parse(reference,"nl");
        rangeCheck(result,0, 'rut',1,2,1,4);
        rangeCheck(result,1, 'rut',4,3,4,5);
    });

    it("Merger Range Reference - Ruth 1:2,4:3-5 - local chapter - semicolon terminator", () => {
        const reference = "lees in Ruth 1:2,4:3-5 over Boas";
        const result = parse(reference,"nl");
        rangeCheck(result,0, 'rut',1,2,1,2);
        rangeCheck(result,1, 'rut',4,3,4,5);
    });

    it("Merger Range Reference - Ruth 1:2-4,4:3 - local chapter -  bracket terminator", () => {
        const reference = "lees in Ruth 1:2-4,4:3 over Boas";
        const result = parse(reference,"nl");
        rangeCheck(result,0, 'rut',1,2,1,4);
        rangeCheck(result,1, 'rut',4,3,4,3);
    });

    it("Merger Range Reference - Ruth 1:2-2:4,4:3-5 - local chapter -  sentence", () => {
        const reference = "lees in Ruth 1:2-2:4,4:3-5 over Boas";
        const result = parse(reference,"nl");
        rangeCheck(result,0, 'rut',1,2,2,4);
        rangeCheck(result,1, 'rut',4,3,4,5);
    });

    it("Merger Range Reference - Ruth 1:2,3:3-4:5 - local chapter - semicolon terminator", () => {
        const reference = "lees in Ruth 1:2,3:3-4:5 over Boas";
        const result = parse(reference,"nl");
        rangeCheck(result,0, 'rut',1,2,1,2);
        rangeCheck(result,1, 'rut',3,3,4,5);
    });

    it("Merger Range Reference - Ruth 1:2-2:4,4:3-5:5 - local chapter -  bracket terminator", () => {
        const reference = "lees in Ruth 1:2-2:4,3:4-4:5 over Boas";
        const result = parse(reference,"nl");
        rangeCheck(result,0, 'rut',1,2,2,4);
        rangeCheck(result,1, 'rut',3,4,4,5);
    });

    it("Single Chapter Reference - Judas 1", () => {
        const reference = "Judas 1 ";
        const result = parse(reference,"nl");
        singleRangeCheck(result, "jud", 1, 1, 1, 1);
    });

    it("Single Chapter Reference Merger - Judas 1,3", () => {
        const reference = "Judas 1,3 ";
        const result = parse(reference,"nl");
        rangeCheck(result,0, 'jud',1,1,1,1);
        rangeCheck(result,1, 'jud',1,3,1,3);
    });

    it("Single Chapter Reference Range - Judas 1-3", () => {
        const reference = "Judas 1-3 ";
        const result = parse(reference,"nl");
        singleRangeCheck(result, "jud", 1, 1, 1, 3);
    });

    it("Single Chapter Reference Merger Range - Judas 1-3,6", () => {
        const reference = "Judas 1-3,6.";
        const result = parse(reference,"nl");
        rangeCheck(result,0, 'jud',1,1,1,3);
        rangeCheck(result,1, 'jud',1,6,1,6);
    });

    // It found was found that the book of Johannes presented a special problem, since it's a subset of 1 Johannes
    it("Johannus Gospel case",function() {
        var reference = "lees Johannes 2:1";
        const result = parse(reference,"nl");
        singleRangeCheck(result, "jhn", 2, 1, 2, 1);
    });

    it("1 Johannus case",function() {
        var reference = "te vinden in 1 Johannes 2:1";
        const result = parse(reference,"nl");
        singleRangeCheck(result, "1jn", 2, 1, 2, 1);
    });

    it("Multiple Johannus case",function() {
        var reference = "te vinden in 1 Johannes 1:1 en Johannes 2:1 en verder in";
        const result = parse(reference,"nl");
        expect(result.length).toBe(2);

        const index1jn = result[0].book === '1jn' ? 0 : 1;
        const indexJhn = (index1jn === 0) ? 1 : 0;

       bookCheck(result,index1jn, 0,'1jn',1,1,1,1);
       bookCheck(result,indexJhn, 0,'jhn',2,1,2,1);

    });

    it("Romeinen 1:8a case",function() {
        const reference = "te vinden in Romeinen 1:8a en verder in";
        const result = parse(reference,"nl");
        singleRangeCheck(result, "rom", 1, 8, 1, 8);
    });

    it("Romeinen 1:8a-10 case",function() {
        const reference = "te vinden in Romeinen 1:8a-10 en verder in";
        const result = parse(reference,"nl");
        singleRangeCheck(result, "rom", 1, 8, 1, 10);
    });

    // (BIJ-11) A colon after a reference leaves it undetected
    it("BIJ-11 - colon", () => {
        const reference = "In Ruth 1:2-2:4,3:4-4:5: Boas";
        const result = parse(reference,"nl");

        rangeCheck(result,0, 'rut',1,2,2,4);
        rangeCheck(result,1, 'rut',3,4,4,5);
    });

    // (BIJ-11) A colon after a reference leaves it undetected
    it("BIJ-11 - colon (2)", () => {
        var reference = "In Ruth 1:2: Boas";
        const result = parse(reference,"nl");
        singleRangeCheck(result, "rut", 1, 2, 1, 2);
    });

    // (BIJ-11) A comma after a reference leaves it undetected
    it("BIJ-11 - comma", () => {
        const reference = "In Ruth 1:2-2:4,3:4-4:5, Boas";
        const result = parse(reference,"nl");
        rangeCheck(result,0, 'rut',1,2,2,4);
        rangeCheck(result,1, 'rut',3,4,4,5);
    });

    // (BIJ-11) A colon after a reference leaves it undetected
    it("BIJ-11 - colon - name with index book", () => {
        const reference = "In 1 Johannes 1:2-2:4,3:4-4:5: Boas";
        const result = parse(reference,"nl");
        rangeCheck(result,0, '1jn',1,2,2,4);
        rangeCheck(result,1, '1jn',3,4,4,5);
    });

    // (BIJ-11) A colon after a reference leaves it undetected
    it("BIJ-11 - colon (2) - name with index book", () => {
        const reference = "In 1 Johannes 1:2: Boas";
        const result = parse(reference,"nl");
        singleRangeCheck(result, "1jn", 1, 2, 1, 2);
    });

    // (BIJ-11) A comma after a reference leaves it undetected
    it("BIJ-11 - comma - name with index book", () => {
        const reference = "In 1 Johannes 1:2-2:4,3:4-4:5, Boas";
        const result = parse(reference,"nl");
        rangeCheck(result,0, '1jn',1,2,2,4);
        rangeCheck(result,1, '1jn',3,4,4,5);
    });

    // (BIJ-92) issues with john 2.
    it("BIJ-92 - issues with john 2", () => {
        const reference = "In 1 Johannes 1:2 vinden";
        const result = parse(reference,"nl");
        singleRangeCheck(result, "1jn", 1, 2, 1, 2);
    });

    // (BIJ-92) issues with john 2.
    it("BIJ-92 - issues with john 2", () => {
        const reference = "In 2 Johannes 2 vinden";
        const result = parse(reference,"nl");
        singleRangeCheck(result, "2jn", 1, 2, 1, 2);
    });

    // (BIJ-92) issues with john 3.
    it("BIJ-92 - issues with john 3", () => {
        const reference = "In 3 Johannes 2 vinden";
        const result = parse(reference,"nl");
        singleRangeCheck(result, "3jn", 1, 2, 1, 2);
    });

    // (bbcs-web-nl#8) issues with timothy 2.
    it("bbcs-web-nl#8 - issues with timothy 2", () => {
        let reference = "In 2 Timotheüs 1:1 vinden";
        let result = parse(reference,"nl");
        singleRangeCheck(result, "2ti", 1, 1, 1, 1);

        reference = "In 2 Timotheüs 2:1 vinden";
        result = parse(reference,"nl");
        singleRangeCheck(result, "2ti", 2, 1, 2, 1);
    });

    // (bbcs-web-nl#8) issues with timothy 2.
    it("bbcs-web-nl#8 - issues with timothy 1", () => {
        let reference = "In 1 Timotheüs 1:1 vinden";
        let result = parse(reference,"nl");
        singleRangeCheck(result, "1ti", 1, 1, 1, 1);

        reference = "In 1 Timotheüs 2:1 vinden";
        result = parse(reference,"nl");
        singleRangeCheck(result, "1ti", 2, 1, 2, 1);
    });

    it("reduce - simplify output", () => {
        var reference = "te vinden in 1 Johannes 1:2 en Johannes 3:4 en verder in";
        const result = reduce(parse(reference,"nl"));
        expect(result.length).toBe(2);

        expect(result[0].start).toBe(13)
        expect(result[0].end).toBe(27);
        expect(result[0].input).toBe('1 Johannes 1:2');
        expect(result[0].chapter.start).toBe(1);
        expect(result[0].chapter.end).toBe(1);
        expect(result[0].verse.start).toBe(2);
        expect(result[0].verse.end).toBe(2);

        expect(result[1].start).toBe(31)
        expect(result[1].end).toBe(43);
        expect(result[1].input).toBe('Johannes 3:4');
        expect(result[1].chapter.start).toBe(3);
        expect(result[1].chapter.end).toBe(3);
        expect(result[1].verse.start).toBe(4);
        expect(result[1].verse.end).toBe(4);
    })
});

const singleVerseCheck = (result) => singleRangeCheck(result,"rut",1,2,1,2);

const singleRangeCheck = (result, book, chapterStart, verseStart, chapterEnd,  verseEnd) =>
    rangeCheck(result, 0, book, chapterStart,verseStart, chapterEnd, verseEnd);

const rangeCheck = (result, index, book, chapterStart, verseStart, chapterEnd,  verseEnd) => {
    expect(result.length).toBe(1);
    bookCheck(result,0, index, book, chapterStart, verseStart, chapterEnd, verseEnd);
}

const bookCheck = (result, bookIndex, rangeIndex, book, chapterStart, verseStart, chapterEnd,  verseEnd) => {
    expect(result[bookIndex].book).toBe(book);
    expect(result[bookIndex].ranges[rangeIndex].chapter.start).toBe(chapterStart);
    expect(result[bookIndex].ranges[rangeIndex].chapter.end).toBe(chapterEnd);
    expect(result[bookIndex].ranges[rangeIndex].verse.start).toBe(verseStart);
    expect(result[bookIndex].ranges[rangeIndex].verse.end).toBe(verseEnd);
}



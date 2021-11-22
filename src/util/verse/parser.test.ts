import { parse } from './parser'
import { assert } from './parser.test.utils';

describe("bible verse parser", () => {

    it("Non-Reference-Text", () => {
        const result = parse("text");
        assert(result, []);
    });

    it("Non-Reference-Text - book only", () => {
        const result = parse("text Ruth");
        assert(result, []);
    });

    it("Simple Reference - Ruth 1:2 - space terminator", () => {
        const reference = "Ruth 1:2 ";
        const result = parse(reference);
        assert(result, [ { index : 0, length : 8, ref: "rut|1:2" } ]);
    });

    it("Simple Reference - Ruth 1:2 - dot terminator", () => {
        const reference = "Ruth 1:2.";
        const result = parse(reference);
        assert(result, [ { index : 0, length : 8, ref: "rut|1:2" } ]);
    });

    it("Simple Reference - Ruth 1:2 - semicolon terminator", () => {
        const reference = "Ruth 1:2;";
        const result = parse(reference);
        assert(result, [ { index : 0, length : 8, ref: "rut|1:2" } ]);
    });

    it("Simple Reference - Ruth 1:2 - bracket terminator", () => {
        const reference = "(Ruth 1:2)";
        const result = parse(reference);
        assert(result, [ { index : 1, length : 8, ref: "rut|1:2" } ]);
    });

    it("Simple Reference - Genesis 18:2 - in sentence dot terminator", () => {
        const reference = "De Heer riep Abraham in Genesis 18:2.";
        const result = parse(reference);
        assert(result, [ { index : 24, length : 12, ref: "gen|18:2" } ]);
    });

    it("Range Reference - Ruth 1:2-4 - local chapter - space terminator", () => {
        const reference = "Ruth 1:2-4 ";
        const result = parse(reference);
        assert(result, [ { index : 0, length : 10, ref: "rut|1:2-1:4" } ]);
    });

    it("Range Reference - Ruth 1:2-4 - local chapter - dot terminator", () => {
        const reference = "Ruth 1:2-4.";
        const result = parse(reference);
        assert(result, [ { index : 0, length : 10, ref: "rut|1:2-1:4" } ]);
    });

    it("Range Reference - Ruth 1:2-4 - local chapter - semicolon terminator", () => {
        const reference = "Ruth 1:2-4;";
        const result = parse(reference);
        assert(result, [ { index : 0, length : 10, ref: "rut|1:2-1:4" } ]);
    });

    it("Range Reference - Ruth 1:2-3:4 - remote chapter - space terminator", () => {
        const reference = "Ruth 1:2-3:4 ";
        const result = parse(reference);
        assert(result, [ { index : 0, length : 12, ref: "rut|1:2-3:4" } ]);
    });

    it("Range Reference - Ruth 1:2-4:4 - remote chapter - dot terminator", () => {
        const reference = "Ruth 1:2-4:4.";
        const result = parse(reference);
        assert(result, [ { index : 0, length : 12, ref: "rut|1:2-4:4" } ]);
    });

    it("Range Reference - Ruth 1:2-2:4 - remote chapter - semicolon terminator", () => {
        const reference = "Ruth 1:2-2:4;";
        const result = parse(reference);
        assert(result, [ { index : 0, length : 12, ref: "rut|1:2-2:4" } ]);
    });

    it("Merger Reference - Ruth 1:2,3 - local chapter -  dot terminator", () => {
        const reference = "Ruth 1:2,3.";
        const result = parse(reference);
        assert(result, [ { index : 0, length : 10, ref: "rut|1:2,rut|1:3" } ]);
    });

    it("Merger Reference - Ruth 1:2,3 - local chapter - semicolon terminator", () => {
        const reference = "Ruth 1:2,3;";
        const result = parse(reference);
        assert(result, [ { index : 0, length : 10, ref: "rut|1:2,rut|1:3" } ]);
    });

    it("Merger Reference - Ruth 1:2,3 - local chapter -  bracket terminator", () => {
        const reference = "(Ruth 1:2,3)";
        const result = parse(reference);
        assert(result, [ { index : 1, length : 10, ref: "rut|1:2,rut|1:3" } ]);
    });

    it("Merger Reference - Ruth 1:2,4:3 - remote chapter -  dot terminator", () => {
        const reference = "Ruth 1:2,4:3.";
        const result = parse(reference);
        assert(result, [ { index : 0, length : 12, ref: "rut|1:2,rut|4:3" } ]);
    });

    it("Merger Reference - Ruth 1:2,3:3 - remote chapter - semicolon terminator", () => {
        const reference = "Ruth 1:2,3:3;";
        const result = parse(reference);
        assert(result, [ { index : 0, length : 12, ref: "rut|1:2,rut|3:3" } ]);
    });

    it("Merger Reference - Ruth 1:2,3:3 - remote chapter -  bracket terminator", () => {
        const reference = "(Ruth 1:2,3:3)";
        const result = parse(reference);
        assert(result, [ { index : 1, length : 12, ref: "rut|1:2,rut|3:3" } ]);
    });

    it("Merger Range Reference - Ruth 1:2-4,4:3-5 - local chapter -  sentence", () => {
        const reference = "lees in Ruth 1:2-4,4:3-5 over Boas";
        const result = parse(reference);
        assert(result, [ { index : 8, length : 16, ref: "rut|1:2-1:4,rut|4:3-4:5" } ]);
    });

    it("Merger Range Reference - Ruth 1:2,4:3-5 - local chapter - semicolon terminator", () => {
        const reference = "lees in Ruth 1:2,4:3-5 over Boas";
        const result = parse(reference);
        assert(result, [ { index : 8, length : 14, ref: "rut|1:2,rut|4:3-4:5" } ]);
    });

    it("Merger Range Reference - Ruth 1:2-4,4:3 - local chapter -  bracket terminator", () => {
        const reference = "lees in Ruth 1:2-4,4:3 over Boas";
        const result = parse(reference);
        assert(result, [ { index : 8, length : 14, ref: "rut|1:2-1:4,rut|4:3" } ]);
    });

    it("Merger Range Reference - Ruth 1:2-2:4,4:3-5 - local chapter -  sentence", () => {
        const reference = "lees in Ruth 1:2-2:4,4:3-5 over Boas";
        const result = parse(reference);
        assert(result, [ { index : 8, length : 18, ref: "rut|1:2-2:4,rut|4:3-4:5" } ]);
    });

    it("Merger Range Reference - Ruth 1:2,4:3-5:5 - local chapter - semicolon terminator", () => {
        const reference = "lees in Ruth 1:2,4:3-5:5 over Boas";
        const result = parse(reference);
        assert(result, [ { index : 8, length : 16, ref: "rut|1:2,rut|4:3-5:5" } ]);
    });

    it("Merger Range Reference - Ruth 1:2-2:4,4:3-5:5 - local chapter -  bracket terminator", () => {
        const reference = "lees in Ruth 1:2-2:4,4:3-5:5 over Boas";
        const result = parse(reference);
        assert(result, [ { index : 8, length : 20, ref: "rut|1:2-2:4,rut|4:3-5:5" } ]);
    });

    it("Single Chapter Reference - Judas 1", () => {
        const reference = "Judas 1 ";
        const result = parse(reference);
        assert(result, [ { index : 0, length : 7, ref: "jud|1:1" } ]);
    });

    it("Single Chapter Reference Merger - Judas 1,3", () => {
        const reference = "Judas 1,3 ";
        const result = parse(reference);
        assert(result, [ { index : 0, length : 9, ref: "jud|1:1,jud|1:3" } ]);
    });

    it("Single Chapter Reference Range - Judas 1-3", () => {
        const reference = "Judas 1-3 ";
        const result = parse(reference);
        assert(result, [ { index : 0, length : 9, ref: "jud|1:1-1:3" } ]);
    });

    it("Single Chapter Reference Merger Range - Judas 1-3,6", () => {
        const reference = "Judas 1-3,6.";
        const result = parse(reference);
        assert(result, [ { index : 0, length : 11, ref: "jud|1:1-1:3,jud|1:6" } ]);
    });

    // It found was found that the book of Johannes presented a special problem, since it's a subset of 1 Johannes
    it("Johannus case",() => {
        const reference = "te vinden in 1 Johannes 1:1 en Johannes 2:1 en verder in";
        const result = parse(reference);

        const expected = [
            { index: 13, length: 14, ref: "1jn|1:1"},
            { index: 31, length: 12, ref: "jhn|2:1"}
        ]

        assert(result, expected);
    });

    // It found was found that the book of Johannes presented a special problem, since it's a subset of 1 Johannes
    it("Romeinen 1:8a case",() => {
        const reference = "te vinden in Romeinen 1:8a en verder in";
        const result = parse(reference);
        assert(result, [ { index : 13, length : 12, ref: "rom|1:8" } ]);
    });

    // (BIJ-11) A colon after a reference leaves it undetected
    it("BIJ-11 - colon", () => {
        const reference = "In Ruth 1:2-2:4,4:3-5:5: Boas";
        const result = parse(reference);
        assert(result, [ { index : 3, length : 20, ref: "rut|1:2-2:4,rut|4:3-5:5" } ]);
    });

    // (BIJ-11) A colon after a reference leaves it undetected
    it("BIJ-11 - colon (2)", () => {
        const reference = "In Ruth 1:2: Boas";
        const result = parse(reference);
        assert(result, [ { index : 3, length : 8, ref: "rut|1:2" } ]);
    });

    // (BIJ-11) A comma after a reference leaves it undetected
    it("BIJ-11 - comma", () => {
        const reference = "In Ruth 1:2-2:4,4:3-5:5, Boas";
        const result = parse(reference);
        assert(result, [ { index : 3, length : 20, ref: "rut|1:2-2:4,rut|4:3-5:5" } ]);
    });

    // (BIJ-11) A colon after a reference leaves it undetected
    it("BIJ-11 - colon - name with index book", () => {
        const reference = "In 1 Johannes 1:2-2:4,4:3-5:5: Johannes";
        const result = parse(reference);
        assert(result, [ { index : 3, length : 26, ref: "1jn|1:2-2:4,1jn|4:3-5:5" } ]);
    });

    // (BIJ-11) A colon after a reference leaves it undetected
    it("BIJ-11 - colon (2) - name with index book", () => {
        const reference = "In 1 Johannes 1:2: Johannes";
        const result = parse(reference);
        assert(result, [ { index : 3, length : 14, ref: "1jn|1:2" } ]);
    });

    // (BIJ-11) A comma after a reference leaves it undetected
    it("BIJ-11 - comma - name with index book", () => {
        const reference = "In 1 Johannes 1:2-2:4,4:3-5:5, Johannes";
        const result = parse(reference);
        assert(result, [ { index : 3, length : 26, ref: "1jn|1:2-2:4,1jn|4:3-5:5" } ]);
    });

    // (BIJ-92) issues with john 1.
    it("BIJ-92 - issues with john 1:2", () => {
        const reference = "In 1 Johannes 1:2 vinden";
        let result = parse(reference);
        assert(result, [ { index : 3, length : 14, ref: "1jn|1:2" } ]);
    });

    // (BIJ-92) issues with john 2.
    it("BIJ-92 - issues with john 2:2", () => {
        const reference = "In 2 Johannes 2 vinden";
        let result = parse(reference);
        assert(result, [ { index : 3, length : 12, ref: "2jn|1:2" } ]);
    });

    // (BIJ-92) issues with john 3.
    it("BIJ-92 - issues with john 3", () => {
        const reference = "In 3 Johannes 2 vinden";
        let result = parse(reference);
        assert(result, [ { index : 3, length : 12, ref: "3jn|1:2" } ]);
    });

    // (bbcs-web-nl#8) issues with timothy 2.
    it("bbcs-web-nl#8 - issues with timothy 2", () => {
        let reference = "In 2 Timotheüs 1:1 vinden";
        let result = parse(reference);
        assert(result, [ { index : 3, length : 15, ref: "2ti|1:1" } ]);

        reference = "In 2 Timotheüs 2:1 vinden";
        result = parse(reference);
        assert(result, [ { index : 3, length : 15, ref: "2ti|2:1" } ]);
    });

    // (bbcs-web-nl#8) issues with timothy 1.
    it("bbcs-web-nl#8 - issues with timothy 1", () => {
        let reference = "In 1 Timotheüs 1:1 vinden";
        let result = parse(reference);
        assert(result, [ { index : 3, length : 15, ref: "1ti|1:1" } ]);

        reference = "In 1 Timotheüs 2:1 vinden";
        result = parse(reference);
        assert(result, [ { index : 3, length : 15, ref: "1ti|2:1" } ]);
    });
});


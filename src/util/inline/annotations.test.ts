import { getAnnotations,  merge } from "./annotations";
import * as parsers from "./parsers";
import { assert, run, runParams } from "./annotations.test.utils";
import { Annotation, InlineType } from "../../types";

describe("getAnnotations", () => {
    const params = {
        bold: { text: "**bold**", parser: parsers.bold, expected: "§§bold§§" },
        italic: { text: "*italic*", parser: parsers.italic, expected: "*italic*" },
    };

    test("bold", () => {
        runParams(params.bold);
    });

    test("italic", () => {
        runParams(params.bold);
    });

    test("inner, line end", () => {
        // Arrange
        const text = "this is ***bold and italic***";

        // Act
        const [output, result] = getAnnotations(text, [
            parsers.bold,
            parsers.italic,
        ]);

        // Assert
        const expected = [
            { type: InlineType.Bold, index: 9, length: 19 },
            { type: InlineType.Italic, index: 8, length: 21 },
        ];

        expect(output).toBe("this is *§§bold and italic§§*");
        assert(expected, result);
    });

    test("inner, line start", () => {
        // Arrange
        const text = "***bold and italic*** at the beginning";

        // Act
        const [output, result] = getAnnotations(text, [
            parsers.bold,
            parsers.italic,
        ]);

        // Assert
        const expected = [
            { type: InlineType.Bold, index: 1, length: 19 },
            { type: InlineType.Italic, index: 0, length: 21 },
        ];

        expect(output).toBe("*§§bold and italic§§* at the beginning");
        assert(expected, result);
    });

    test("inner, line middle", () => {
        // Arrange
        const text = "no ***bold and italic*** are at not the beginning";

        // Act
        const [output, result] = getAnnotations(text, [
            parsers.bold,
            parsers.italic,
        ]);

        // Assert
        const expected = [
            { type: InlineType.Bold, index: 4, length: 19 },
            { type: InlineType.Italic, index: 3, length: 21 },
        ];

        expect(output).toBe(
            "no *§§bold and italic§§* are at not the beginning"
        );
        assert(expected, result);
    });

    test("bold twice", () => {
        // Arrange
        const text = "start with **bold** and **end** with it.";

        // Act
        const [output, result] = getAnnotations(text, [
            parsers.bold,
            parsers.italic,
        ]);

        // Assert
        const expected = [
            { type: InlineType.Bold, index: 11, length: 8 },
            { type: InlineType.Bold, index: 24, length: 7 },
        ];

        expect(output).toBe("start with §§bold§§ and §§end§§ with it.");
        assert(expected, result);
    });

    test("bold & italic", () => {
        // Arrange
        const text = "***bold & italic***";
        const output = "*§§bold & italic§§*";

        const expected = [
            { type: InlineType.Bold, index: 1, length: 17 },
            { type: InlineType.Italic, index: 0, length: 19 },
        ];

        // Act & Assert
        run(text, output, expected);
    });
});

describe("merge", () => {
    test("bold & italic", () => {
        // Assert
        const annotations = [
            { type: InlineType.Italic, index: 0, length: 21, children: undefined },
            { type: InlineType.Bold, index: 1, length: 19 },
        ] as Annotation[];

        const expected = { ...annotations[0] };
        expected.children = [ {...annotations[1]} ];

        // Act
        const merged = merge(annotations);

        // Assert
        assert([expected], merged);
    });

    test("image & link", () => {
        // Assert
        const annotations = [
            { type: InlineType.Image, index: 1, length:148 },
            { type: InlineType.Link, index: 0, length: 233, children : undefined }
        ] as Annotation[];

        const expected = { ...annotations[1] };
        expected.children = [ {...annotations[0]} ];

        // Act
        const merged = merge(annotations);

        // Assert
        assert([expected], merged);
    });
});
import { getAnnotations, Annotation, merge } from "./inline";
import specs from "./specs";
import { compare, run, runParams } from "./inline.test.utils";

describe("getAnnotations", () => {
    const params = {
        bold: { text: "**bold**", ...specs.bold, expected: "§§bold§§" },
        italic: { text: "*italic*", ...specs.italic, expected: "*italic*" },
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
            specs.bold,
            specs.italic,
        ]);

        // Assert
        const expected = [
            { type: "bold", index: 9, length: 19 },
            { type: "italic", index: 8, length: 21 },
        ];

        expect(output).toBe("this is *§§bold and italic§§*");
        compare(expected, result);
    });

    test("inner, line start", () => {
        // Arrange
        const text = "***bold and italic*** at the beginning";

        // Act
        const [output, result] = getAnnotations(text, [
            specs.bold,
            specs.italic,
        ]);

        // Assert
        const expected = [
            { type: "bold", index: 1, length: 19 },
            { type: "italic", index: 0, length: 21 },
        ];

        expect(output).toBe("*§§bold and italic§§* at the beginning");
        compare(expected, result);
    });

    test("inner, line middle", () => {
        // Arrange
        const text = "no ***bold and italic*** are at not the beginning";

        // Act
        const [output, result] = getAnnotations(text, [
            specs.bold,
            specs.italic,
        ]);

        // Assert
        const expected = [
            { type: "bold", index: 4, length: 19 },
            { type: "italic", index: 3, length: 21 },
        ];

        expect(output).toBe(
            "no *§§bold and italic§§* are at not the beginning"
        );
        compare(expected, result);
    });

    test("bold twice", () => {
        // Arrange
        const text = "start with **bold** and **end** with it.";

        // Act
        const [output, result] = getAnnotations(text, [
            specs.bold,
            specs.italic,
        ]);

        // Assert
        const expected = [
            { type: "bold", index: 11, length: 8 },
            { type: "bold", index: 24, length: 7 },
        ];

        expect(output).toBe("start with §§bold§§ and §§end§§ with it.");
        compare(expected, result);
    });

    test("bold & italic", () => {
        // Arrange
        const text = "***bold & italic***";
        const output = "*§§bold & italic§§*";

        const expected = [
            { type: "bold", index: 1, length: 17 },
            { type: "italic", index: 0, length: 19 },
        ];

        // Act & Assert
        run(text, output, expected);
    });
});

describe("merge", () => {
    test("bold & italic", () => {
        // Assert
        const annotations = [
            { type: "italic", index: 0, length: 21, children: undefined },
            { type: "bold", index: 1, length: 19 },
        ] as Annotation[];

        const expected = { ...annotations[0] };
        expected.children = annotations[1];

        // Act
        const merged = merge(annotations);

        // Assert
        compare([expected], merged);
    });

    test("image & link", () => {
        // Assert
        const annotations = [
            { type: 'image', index: 1, length:148 },
            { type: 'link', index: 0, length: 233, children : undefined }
        ] as Annotation[];

        const expected = { ...annotations[1] };
        expected.children = annotations[0];

        // Act
        const merged = merge(annotations);

        // Assert
        compare([expected], merged);
    });
});
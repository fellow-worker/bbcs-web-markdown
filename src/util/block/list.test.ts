import { parse, clearLineOrderedList, getLevel } from './list'

test("getLevel", () => {
    // Arrange
    const text = "      1. E"

    // Act
    const level = getLevel(text);

    // Assert
    expect(level).toBe(2)
});

test("Simple ordered list", () => {
    // Arrange
    const text = "1. A\n2. B\n3. C";

    // Act
    const structure = parse(text, clearLineOrderedList);

    // Assert
    expect(structure.length).toBe(3);

    expect(structure[0].level).toBe(0)
    expect(structure[0].text).toBe("A");
    expect(structure[1].level).toBe(0)
    expect(structure[1].text).toBe("B");
    expect(structure[2].level).toBe(0)
    expect(structure[2].text).toBe("C");
});

test("Ordered list with ending sub list", () => {
    // Arrange
    const text = "1. A\n2. B\n3. C\n   1. D";

    // Act
    const structure = parse(text, clearLineOrderedList);

    // Assert
    expect(structure.length).toBe(3);
    expect(structure[2].text).toBe("C");
    expect(structure[2].sub.length).toBe(1);
    expect(structure[2].sub[0].level).toBe(1);
    expect(structure[2].sub[0].text).toBe("D");
});

test("Ordered list with inner sub list", () => {
    // Arrange
    const text = "1. A\n2. B\n   1. C\n   2. D\n3. E";

    // Act
    const structure = parse(text, clearLineOrderedList);

    // Assert
    expect(structure.length).toBe(3);
    expect(structure[1].sub.length).toBe(2);
    expect(structure[1].sub[0].text).toBe("C");
    expect(structure[1].sub[1].text).toBe("D");
    expect(structure[2].text).toBe("E");
    expect(structure[2].level).toBe(0);
});

test("Ordered list with sub sub list", () => {
    // Arrange
    const text = "1. A\n2. B\n   1. C\n   2. D\n      1. E";

    // Act
    const structure = parse(text, clearLineOrderedList);

    // Assert
    expect(structure.length).toBe(2);
    expect(structure[1].sub.length).toBe(2);
    expect(structure[1].text).toBe("B");
    expect(structure[1].sub.length).toBe(2)
    expect(structure[1].sub[0].text).toBe("C");
    expect(structure[1].sub[1].text).toBe("D");
    expect(structure[1].sub[1].level).toBe(1);
    expect(structure[1].sub[1].sub.length).toBe(1);
    expect(structure[1].sub[1].sub[0].level).toBe(2);
    expect(structure[1].sub[1].sub[0].text).toBe("E");
});
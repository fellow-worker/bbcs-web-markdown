import { parse } from './markdown';

/* Default header */
test('header-h1-standard', () => { test_standard_header(1); })
test('header-h2-standard', () => { test_standard_header(2); })
test('header-h3-standard', () => { test_standard_header(3); })
test('header-h4-standard', () => { test_standard_header(4); })
test('header-h5-standard', () => { test_standard_header(5); })
test('header-h6-standard', () => { test_standard_header(6); })

const test_standard_header = level => {
    // Arrange
    const text ="#".repeat(level) + " This is a header";

    // Act
    const struct = parse(text);

    // Assert
    expect(struct).toHaveLength(1);
    expect(struct[0].type).toBe('h');
    expect(struct[0].text).toBe('This is a header');
    expect(struct[0].level).toBe(level);
}

/* Robust standard check */
test('header-h6-extra-#', () => {
    // Arrange
    const text ="#".repeat(7) + " This is a header";

    // Act
    const struct = parse(text);

    // Assert
    expect(struct).toHaveLength(1);
    expect(struct[0].type).toBe('h');
    expect(struct[0].text).toBe('This is a header');
    expect(struct[0].level).toBe(6);
});

/* alternatives check */
test('header-alternative-h1', () => {
    // Arrange
    const text = "This is a header\n================";

    // Act
    const struct = parse(text);

    // Assert
    expect(struct).toHaveLength(1);
    expect(struct[0].type).toBe('h');
    expect(struct[0].text).toBe('This is a header');
    expect(struct[0].level).toBe(1);
});

test('header-alternative-h2', () => {
    // Arrange
    const text = "This is a header\n----------------";

    // Act
    const struct = parse(text);

    // Assert
    expect(struct).toHaveLength(1);
    expect(struct[0].type).toBe('h');
    expect(struct[0].text).toBe('This is a header');
    expect(struct[0].level).toBe(2);
});

/* header paragraph test */
test('header-standard-paragraph', () => {
    // Arrange
    const text = "# Test Case 1\n\nExplication";

    // Act
    const struct = parse(text);

    // Assert
    expect(struct).toHaveLength(2);

    expect(struct[0].type).toBe('h');
    expect(struct[0].text).toBe('Test Case 1');
    expect(struct[0].level).toBe(1);

    expect(struct[1].type).toBe('p');
    expect(struct[1].text).toBe('Explication');
});

test('header-alternative-h1-paragraph', () => {
    // Arrange
    const text = "Test Case 1\n===========\n\nExplication";

    // Act
    const struct = parse(text);

    // Assert
    expect(struct).toHaveLength(2);

    expect(struct[0].type).toBe('h');
    expect(struct[0].text).toBe('Test Case 1');
    expect(struct[0].level).toBe(1);

    expect(struct[1].type).toBe('p');
    expect(struct[1].text).toBe('Explication');
});

test('header-alternative-h2-paragraph', () => {
    // Arrange
    const text = "Test Case 1\n-----------\n\nExplication";

    // Act
    const struct = parse(text);

    // Assert
    expect(struct).toHaveLength(2);

    expect(struct[0].type).toBe('h');
    expect(struct[0].text).toBe('Test Case 1');
    expect(struct[0].level).toBe(2);

    expect(struct[1].type).toBe('p');
    expect(struct[1].text).toBe('Explication');
});

/* header paragraph test */
test('header-paragraph-standard-paragraph', () => {
    // Arrange
    const text = "Welcome\n\nWelcome\nWelcome\n\n# Test Case 1\n\nExplication";

    // Act
    const struct = parse(text);

    // Assert
    expect(struct).toHaveLength(3);

    expect(struct[1].type).toBe('h');
    expect(struct[1].text).toBe('Test Case 1');
    expect(struct[1].level).toBe(1);

    expect(struct[2].type).toBe('p');
    expect(struct[2].text).toBe('Explication');
});

/* header exception test */
test('header-standard-exception', () => {

    // Arrange
    const text = "# Test Case 1\nExplication";

    // Act
    const callback = () => { parse(text, true); }

    // Assert
    expect(callback).toThrow("line 2: expecting blank line after header.")

});

test('header-alternative-h1-exception', () => {

    // Arrange
    const text = "Test Case 1\n===========\nExplication";

    // Act
    const callback = () => { parse(text, true); }

    // Assert
    expect(callback).toThrow("line 3: expecting blank line after header.")

});

test('header-alternative-h2-exception', () => {

    // Arrange
    const text = "This is a header\n----------------\nExplication";

    // Act
    const callback = () => { parse(text, true); }

    // Assert
    expect(callback).toThrow("line 3: expecting blank line after header.")

});
export class ParseError extends Error {

    constructor(line, message) {
        super(message);
        this.line = line;
    }
}
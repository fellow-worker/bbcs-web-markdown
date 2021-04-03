/**
 * Return if the given value is of the type string
 * @param {*} value
 * @returns bool True when a string else false
 */
export const isString = value => {
    return typeof value === "string" || value instanceof String;
}
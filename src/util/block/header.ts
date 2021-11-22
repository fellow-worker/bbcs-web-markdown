export function getText(string : string, level : number) : [ string, string | undefined] {
    string = string.substr(level).trim();

    const match = string.match(/{#[a-z-]+}$/);
    if(!match || !match.index) return [ string, undefined]

    const id =string.substr(match.index + 2, match[0].length - 3);
    string = string.substr(0,match.index);

    return [ string ,id ];
}
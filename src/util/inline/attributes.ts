import { Alignment, LinkType } from "../../types";

export const getAttributes = (info : string) => {

    const options = getOptions(info);

    return {
        align : getAlignment(options),
        headingId : getHeadingId(options),
        type : getType(options),
        title : getTitle(options),
        url : getUrl(options),
        width : getWidth(options),
        blank : openBlank(options)
    }
}

const getOptions = (info : string) => {
    const options = new Array<string>();
    let current = new Array<string>();

    info.split(' ').forEach(word => {
        if(current.length === 0 && !word.startsWith('"')) return options.push(word);
        current.push(word)

        if(word.endsWith('"')) {
            options.push(current.join(' '));
            current = [];
        }
    })
    return options;
}

const getAlignment = (options : string[]) => {

    if(options.includes(Alignment.Left)) return Alignment.Left;
    if(options.includes(Alignment.Right)) return Alignment.Right;
    if(options.includes(Alignment.Center)) return Alignment.Center;
    return Alignment.None;
}

function getHeadingId(options : string[]) : string | undefined {
    if(options?.length !== 1) return undefined;
    if(options[0].length < 1) return undefined;
    if(options[0][0] !== "#") return undefined;
    return options[0].substr(1);
}

const getType = (options : string[]) => {

    const types = options.filter(f => f === "video");
    return types.length === 1 ? LinkType.Video : LinkType.Regular;
}

function getTitle(options : string[]) : string | undefined {
    const titles = options.filter(option => option[0] === '"' && option[option.length - 1] === '"');
    if(titles.length === 0) return undefined
    return titles[0].substr(1, titles[0].length - 2);
}

function getUrl(options : string[]) : string | undefined {
    const urls = options.filter(option => option.includes("://") || option.startsWith("/") ||  option.startsWith("../"));
    if(urls.length === 0) return undefined
    return urls[0];
}

function getWidth (options : string[]) : number | undefined {
    for(let index = 0; index < options.length; index++) {

        const parsed = parseInt(options[index]);
        if(!Number.isNaN(parsed)) return Math.min(Math.max(0, parsed),100);
    }
    return undefined;
}

const openBlank = (options : string[]) => {
    return options.filter(o => o === "blank").length !== 0;
}
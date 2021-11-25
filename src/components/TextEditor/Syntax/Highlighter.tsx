import styled, { FlattenSimpleInterpolation } from "styled-components";

export const Highlighter = (props : { text? : string, enabled? : boolean, styled : FlattenSimpleInterpolation }) => {

    const { text, styled, enabled } = props;
    const html = getHtml(text, enabled);

    return (
        <AutoGrow spellCheck={false} styled={styled} dangerouslySetInnerHTML={{__html:html}} />
    )
}

const AutoGrow = styled.div<{styled : FlattenSimpleInterpolation}>`

    ${p => p.styled};
    width: 100%;
    height: 100%;

    span.header { color : #154879; }
    span.bold { color: #154879; }
    span.italic { color:#154879 }
    span.emphasis { color:#154879 }
    span.align { color:rgb(251, 0, 7)}
    span.link { color:rgb(140, 3, 18) }
    span.images { color:rgb(140, 3, 18) }
    span.notes { color:rgb(140, 3, 18) }
    span.notes { color:rgb(204, 119, 34) }
`

const getHtml = (text? : string, enabled? : boolean) => {
    if(!text) return "";
    if(!!enabled) return text;

    text = headers(text);
    text = images(text);
    text = links(text);
    text = emphasis(text);
    text = bold(text);
    text = italic(text);
    text = alignments(text);
    text = notes(text);

    return text;
}


const notes = (text : string) => {
    const regexp =  [ /\[\^.+?\]:/gm, /\[\^.+?\]:/gm ]
    return setClass(text, regexp, "notes");
}

const links = (text : string) => {
    const regexp =  [ /\[[^\n^\]?]+\]\([^\n^)?]+\)/gm ]
    return setClass(text, regexp, "link");
}

const images = (text : string) => {
    const regexp =  [ /!\[[^\n^\]?]+\]\([^\n^)?]+\)/gm ]
    return setClass(text, regexp, "image");
}

const alignments = (text : string) => {
    const regexp =  [ /^\[right\]/gm, /^\[center\]/gm, /^\[justify\]/gm, /^\[clear\]$/gm ]
    return setClass(text, regexp, "align");
}

const headers = (text : string) => {
    const regexp = /^#{1,6} .+\n\n/gm;
    return setClassWithSubstr(text, [ regexp ], "header",0,1);
}

const emphasis = (text : string) => {
    const regexp = [ /[^*]\*{3}[^*^<]+?\*{3}[^*]/gm, /[^_]_{3}[^_^<]+?_{3}[^_]/gm ];
    return setClassWithSubstr(text, regexp, "emphasis", 1, 1);
}

const bold = (text : string) => {
    const regexp = [ /[^*]\*{2}[^*^<]+?\*{2}[^*]/gm, /[^_]_{2}[^_^<]+?_{2}[^_]/gm ];
    return setClassWithSubstr(text, regexp, "bold", 1, 1);
}

const italic = (text : string) => {
    const regexp = [ /[^*]\*{1}[^*^<]+?\*{1}[^*]/gm , /[^_]_{1}[^_^<]+?_{1}[^_]/gm ]
    return setClassWithSubstr(text, regexp, "italic", 1, 1);
}

const setClass = (text : string, regexps : RegExp[], className : string ) => {
    regexps.forEach(regexp => {
        text = text.replaceAll(regexp, `<span class="${className}">$&</span>`);
    });
    return text;
}

const setClassWithSubstr = (text : string, regexps : RegExp[], className : string, start : number, end : number ) => {
    regexps.forEach(regexp => {
        text = text.replaceAll(regexp, match =>
            `${match.substr(0,start)}<span class="bold">${match.substr(start, match.length - end - start)}</span>${match.substr(match.length - end) }`
        );
    });
    return text;
}
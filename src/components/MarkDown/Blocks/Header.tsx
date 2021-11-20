import { Inline } from "../Inline";

export const Header = (props : { text : string}) => {
    const level = props.text.indexOf(' ');
    const [ text, id ] = getText(props.text, level);
    if(text === "") return null;

    switch(level) {
        case 1 : return <h1 id={id}><Inline text={text} /></h1>
        case 2 : return <h2 id={id}><Inline text={text} /></h2>
        case 3 : return <h3 id={id}><Inline text={text} /></h3>
        case 4 : return <h4 id={id}><Inline text={text} /></h4>
        case 5 : return <h5 id={id}><Inline text={text} /></h5>
        case 6 : return <h6 id={id}><Inline text={text} /></h6>
        default : return null;
    }
}

function getText(string : string, level : number) : [ string, string | undefined] {
    string = string.substr(level).trim();

    const match = string.match(/{#[a-z-]+}$/);
    if(!match || !match.index) return [ string, undefined]

    const id =string.substr(match.index + 2, match[0].length - 3);
    string = string.substr(0,match.index);

    return [ string ,id ];
}
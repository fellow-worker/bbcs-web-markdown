import { Inline } from "../Inline";

export const AltHeader = (props : { text : string}) => {

    const lines = props.text.split("\n");
    const isLevelOne = lines[1][0] === "=";

    if(isLevelOne) return <h1><Inline text={lines[0]} /></h1>
    else return <h2><Inline text={lines[0]} /></h2>
}
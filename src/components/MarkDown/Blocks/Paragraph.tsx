import { Alignment } from "../../../util/attributes"
import { Inline } from "../Inline"

export const Paragraph = (props : { text : string}) => {

    const [ className, text ] = getAlignment(props.text);
    return <p className={className}><Inline text={text} /></p>
}

const getAlignment = ( text : string ) => {

    if(text.startsWith(`[${Alignment.Right}]`)) return [ Alignment.Right, text.substr(7) ];
    if(text.startsWith(`[${Alignment.Center}]`)) return [ Alignment.Center, text.substr(8) ];
    if(text.startsWith(`[${Alignment.Left}]`)) return [ Alignment.Left, text.substr(6) ];
    return [ Alignment.Left, text ]
}
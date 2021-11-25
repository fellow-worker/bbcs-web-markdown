import { BlockProps } from './BlockProps'
import { Inline } from "../Inline"
import { Alignment, Document } from '../../../types';
import * as Base from '../../Base'

export const Paragraph = (props : BlockProps) => {
    const { block } = props;

    const alignment = getAlignment(props.block.text);
    const className = alignment === Alignment.None ? Alignment.Left : alignment;
    const lines = block.text.split("\n");

    return (
        <Base.Paragraph className={className}>
            { lines.map((line,index) =>
                <Line
                    {...props}
                    alignment={alignment}
                    index={index}
                    line={line}
                    length={lines.length}
                    key={index}
                />) }
        </Base.Paragraph>
    );
}

const getAlignment = ( text : string ) => {

    if(text.startsWith(`[${Alignment.Right}]`)) return Alignment.Right;
    if(text.startsWith(`[${Alignment.Center}]`)) return Alignment.Center;
    if(text.startsWith(`[${Alignment.Justify}]`)) return Alignment.Justify;
    if(text.startsWith(`[${Alignment.Left}]`)) return Alignment.Left;

    return Alignment.None;
}

type LineProps = {
    alignment : Alignment,
    index : number,
    line : string,
    length : number,
    document : Document,
    onVerseClick : (ref : string) => any
}

const Line = (props : LineProps) => {
    const { alignment, index, line, length } = props;
    const text = index === 0 ? getText(line, alignment) : line;
    const last = index === length - 1;

    const result = <Inline {...props}  text={text} />
    return !last ? <>{result}<Base.BreakLine/></> : result;
}

const getText = ( text : string, alignment : Alignment ) => {
    if(alignment === Alignment.None) return text;
    return text.substr(alignment.length + 2);
}
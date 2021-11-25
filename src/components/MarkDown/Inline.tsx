import { annotate } from '../../util/inline/annotations';
import { Line } from './Tags/Line'
import { Document } from 'types'

type InlineProps = {
    text : string;
    document : Document
    onVerseClick : (ref : string) => any
}

export const Inline = (props : InlineProps) => {
    const lines = props.text.split("\n");
    return (
        <>
            { lines.map((line,key) => <Text {...props} key={key} text={line} /> )}
        </>
    )
}

const Text = (props : InlineProps) => {
    const { text } = props;
    const annotations = annotate(text);
    return <Line {...props} annotations={annotations} start={0} end={text.length} text={text} />
}
import { parse } from '../../util/inline';
import { Line } from './Tags/Line'

export const Inline = (props : { text : string}) => {
    const lines = props.text.split("\n");
    return (
        <>
            { lines.map((line,key) => <Text key={key} text={line} /> )}
        </>
    )
}

const Text = (props : { text : string } ) => {
    const { text } = props;
    const annotations = parse(text);
    console.log(annotations);
    return <Line annotations={annotations} index={0} text={text} />
}


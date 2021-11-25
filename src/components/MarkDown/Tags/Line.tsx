import { Annotation, Document } from "../../../types";
import { Tag } from './Tag'

type LineProps = {
    text : string,
    start : number,
    annotations? : Annotation[],
    document : Document
    onVerseClick : (ref : string) => any;
    end : number;
}

export const Line = (props : LineProps) => {
    const { text, start, end, annotations } = props;
    if(end > text.length) return null;

    // No annotation? Add the remainder of the text
    const next = getNextAnnotation(start, annotations);
    if(next === null) return <>{text.substring(start, end)}</>;

    return (
        <>
            {text.substring(start, next.index)}
            <Tag {...props} active={next} text={text} />
            <Line {...props} start={next.index + next.length} />
        </>
    );
}

const getNextAnnotation = (index : number, annotations? : Annotation[]) => {
    if(!annotations) return null;
    let next = null as Annotation | null;
    annotations.forEach(a => {
        if(index > a.index) return;
        if(!next || a.index < next.index) next = a;
    })

    return next;
}

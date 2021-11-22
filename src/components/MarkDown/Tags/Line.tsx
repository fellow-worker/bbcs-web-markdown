import { Annotation, Document } from "@/types";
import { Tag } from './Tag'

type LineProps = {
    text : string,
    index : number,
    annotations : Annotation[],
    document : Document
    onVerseClick : (ref : string) => any;
}

export const Line = (props : LineProps) => {
    const { text, index, annotations } = props;
    if(index >= text.length) return null;

    const next = getNextAnnotation(index, annotations);
    if(next === null) return <>{text.substr(index)}</>;

    return (
        <>
            {text.substr(index, next.index - index)}
            <Tag {...props}  active={next} text={text} />
            <Line {...props} index={next.index + next.length} text={text} annotations={annotations} />
        </>
    );
}

const getNextAnnotation = (index : number, annotations : Annotation[]) => {

    let next = null as Annotation | null;
    annotations.forEach(a => {
        if(index > a.index) return;
        if(!next || a.index < next.index) next = a;
    })

    return next;
}
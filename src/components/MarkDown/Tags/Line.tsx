import { Annotation } from "../../../util/inline";
import { Tag } from './Tag'

type LineProps = { text : string, index : number, annotations : Annotation[] }

export const Line = (props : LineProps) => {
    const { text, index, annotations } = props;
    if(index >= text.length) return null;

    const next = getNextAnnotation(index, annotations);
    if(next === null) return <>{text.substr(index)}</>;

    return (
        <>
            {text.substr(index, next.index - index)}
            <Tag active={next} text={text} />
            <Line index={next.index + next.length} text={text} annotations={annotations} />
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
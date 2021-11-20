import { parsers as all} from "./specs";

export type Parser = {
    regexp : RegExp[]
    type : string
    intermediate? : (value : string) => string
}

export const parse = (text : string, parsers? : Parser[]) => {
    if(!parsers) parsers = all;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, annotations] = getAnnotations(text,parsers);
    return merge(annotations);
}

export type Annotation = { type : string, index : number,  length: number, children? : Annotation  }

export function getAnnotations(text : string, parsers : Parser[]) : [string, Annotation[]] {
    const result = [] as Annotation[];

    parsers.forEach(parser => {

        parser.regexp.forEach(regexp => {
            let match = text.match(regexp);
            let index = 0;
            while(match !== null) {

                if(match.index === undefined) break;

                result.push({ type : parser.type, index : index + match.index , length: match[0].length  })
                text = replaceMatch(text, index + match.index, match[0].length, parser);
                index = index + match.index + match[0].length;

                match = text.substr(index).match(regexp);
            }
        })
    });

    return [ text, result ];
}

const replaceMatch = (text : string, index : number, length : number, parser : Parser) => {
    if(!parser.intermediate) return text;
    const matched = text.substr(index, length);
    return text.substring(0,index) + parser.intermediate(matched) + text.substring(matched.length + index);
}

export const merge = (annotations : Annotation[]) => {

    const linked = new Set<Annotation>();

    annotations.forEach(annotation => {
        const closets = getClosestAnnotation(annotation, annotations);
        if(!closets) return;
        closets.children = annotation;
        linked.add(annotation);
    });

    annotations.forEach(a => { clean(a)});

    const root = annotations.filter(a => !linked.has(a));
    return root;
}

const clean = (annotation : Annotation) => {
    switch (annotation.type) {
        case "image" :
            annotation.children = undefined;
            break;
        case "link" :
            if(!annotation.children) break;
            if(annotation.children.type === "image") break;
            annotation.children = undefined;
    }
}

const getClosestAnnotation = (annotation: Annotation,  annotations : Annotation[]) => {

    let closets = null as Annotation | null;

    annotations.sort(a => a.index).forEach(inspected => {
        if(!isSurrounded(annotation, inspected)) return;

        if(!closets) closets = inspected;
        else if(isSurrounded(inspected, closets)) closets = inspected;
    });

    return closets;
}

const isSurrounded = (annotation: Annotation, inspected : Annotation) =>{
    if(inspected.index >= annotation.index) return false;
    return (inspected.index + inspected.length) > (annotation.index + annotation.length);
}

export const head = (text : string, annotation : Annotation) => {
    if(!annotation.children) return text.substr(annotation.index, annotation.length)
    return text.substr(annotation.index, annotation.children.index - annotation.index);
}

export const tail = (text : string, annotation : Annotation) => {
    if(!annotation.children) return "";
    const start = annotation.children.index + annotation.children.length;
    return text.substr(start, annotation.length - annotation.children.length);
}
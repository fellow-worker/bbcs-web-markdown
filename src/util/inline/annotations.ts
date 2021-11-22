import { Annotation, Parser, InlineType } from "@/types";
import { parsers as all } from "./parsers";
import { parse  } from '../verse/parser'

export const annotate = (text : string, parsers? : Parser[]) => {
    if(!parsers) parsers = all;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, annotations] = getAnnotations(text,parsers);
    return merge(annotations);
}

export function getAnnotations(text : string, parsers : Parser[]) : [string, Annotation[]] {
    const result = [] as Annotation[];

    parsers.forEach(parser => {

        parser.regexp.forEach(regexp => {
            let match = text.match(regexp);
            let index = 0;

            while(match !== null) {

                if(match.index === undefined) break;

                const replace = replaceMatch(text, index + match.index, match[0].length, parser);
                result.push({ type : parser.type, index : index + match.index , length: replace[1]  })
                text = replace[0]

                index = index + match.index + replace[1];
                match = text.substr(index).match(regexp);
            }
        })
    });

    const verses = parse(text);
    if(verses.length !== 0) result.push(...verses);

    return [ text, result ];
}

function replaceMatch(text : string, index : number, length : number, parser : Parser) : [string, number] {
    if(!parser.intermediate) return [ text, length ];
    const matched = text.substr(index, length);

    const [ replaced, matchLength ] = parser.intermediate(matched);
    return [ text.substring(0,index) + replaced + text.substring(matched.length + index), matchLength ]
}

export const merge = (annotations : Annotation[]) => {

    const linked = new Set<Annotation>();

    annotations.forEach(annotation => {
        const closets = getClosestAnnotation(annotation, annotations);
        if(!closets) return;
        closets.children = annotation;
        linked.add(annotation);
    });

    // annotations.forEach(a => { clean(a)});
    console.log("t", JSON.parse(JSON.stringify(annotations)));
    const root = annotations.filter(a => !linked.has(a));
    return root;
}

const clean = (annotation : Annotation) => {
    switch (annotation.type) {
        case InlineType.SubScript:
        case InlineType.SuperScript:
        case InlineType.Image:
        case InlineType.Reference:
            annotation.children = undefined;
            break;
        case InlineType.Link:
            if(!annotation.children) break;
            if(annotation.children.type === InlineType.Image) break;
            annotation.children = undefined;
            break;
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
import { Annotation, Parser } from "../../types";
import { parsers as all, getParser } from "./parsers";
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

                const annotation = { type : parser.type, index : index + match.index, length : replace[1] } as Annotation
                annotation.type = parser.type;

                result.push(annotation)
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

    annotations.forEach(outer => {
        // Get all the possible children for this annotation
        const children = annotations.filter(inner => isInnerAnnotation(outer, inner));
        if(children.length === 0) return;

        // ensure they are added in the set so they not will be come a root annotation
        children.forEach(child => { linked.add(child); });

        // Only add the children which are valid
        const valid = children.filter(inner => isValidChild(outer, inner));
        if(valid.length === 0) return;
        outer.children = valid;

    });

    const root = annotations.filter(a => !linked.has(a));
    return root;
}

const isValidChild = (parent: Annotation, child : Annotation) => {
    const parser = getParser(parent.type);
    return parser?.children.includes(child.type) === true;
}

const isInnerAnnotation = (outer: Annotation, inner : Annotation) => {
    if(outer === inner) return false;

    if(inner.index <= outer.index) return false;
    return (outer.index + outer.length) > (inner.index + inner.length);
}

export const getText = (text : string, annotation : Annotation) => {
    return text.substr(annotation.index, annotation.length)
}
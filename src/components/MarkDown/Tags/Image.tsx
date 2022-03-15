import { getText } from "../../../util/inline/annotations";
import { replaceAt } from "../../../util/string";
import { getAttributes } from "../../../util/inline/attributes";
import { TagProps } from "./TagProps";
import * as Base from '../../Base'
import { Annotation } from "../../../types";

export const Image = (props : TagProps) => {
    const { text, active } = props;
    const info = getInfo(text,active);

    const altText = info.substring(2, info.indexOf("]") - 1);
    const attr = info.match(/\([^\n]+\)/);

    if(attr === null) return null;
    const attributes = getAttributes(attr[0].substr(1, attr[0].length -2));

    return (
        <Base.Image
            align={attributes.align}
            width={attributes.width}
            src={attributes.url}
            alt={altText}
            title={attributes.title}
        />
    );
}

const getInfo = (text : string, annotation : Annotation) => {
    let info = getText(text, annotation);
    if(!info.includes('§')) return info;

    info = replaceAt(info, info.indexOf('§'), '[');
    info = replaceAt(info, info.indexOf('§'), ']');
    info = replaceAt(info, info.indexOf('¤'), '(');
    info = replaceAt(info, info.indexOf('¤'), ')');

    return info;
}
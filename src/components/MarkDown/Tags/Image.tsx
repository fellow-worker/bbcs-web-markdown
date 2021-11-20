import { Annotation, head } from "../../../util/inline";
import { replaceAt } from "../../../util/string";
import { Alignment, getAttributes } from "../../../util/attributes";
import { TagProps } from "./TagProps";
import { CSSProperties } from "styled-components";

export const Image = (props : TagProps) => {
    const { text, active } = props;
    const info = getInfo(text,active);

    const altText = info.substr(1, info.indexOf("§") - 1);
    const attr = info.match(/\([^\n]+\)/);

    if(attr === null) return null;
    const attributes = getAttributes(attr[0].substr(1, attr[0].length -2));

    const className = attributes.align !== Alignment.None ? attributes.align : "";
    const style = {} as CSSProperties;

    style.width = attributes.width ? attributes.width + "%" : "100%";
    return <img style={style} className={className} alt={altText} title={attributes.title} src={attributes.url} />
}

const getInfo = (text : string, annotation : Annotation) => {
    let info = head(text, annotation);
    if(!info.includes('§')) return info;

    info = replaceAt(info, info.indexOf('§'), '[');
    info = replaceAt(info, info.indexOf('§'), ']');
    info = replaceAt(info, info.indexOf('¤'), '(');
    info = replaceAt(info, info.indexOf('¤'), ')');

    return info;
}


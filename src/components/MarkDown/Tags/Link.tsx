import { head, tail } from "../../../util/inline";
import { getAttributes } from "../../../util/attributes";
import { Tag } from "./Tag";
import { TagProps } from "./TagProps";

export const Link = (props : TagProps) => {
    const { text, active } = props;

    const info = active.children ? tail(text,active) : head(text, active);
    const linkText = info.substr(1, info.indexOf("]") - 1);
    const link = active.children ? <Tag text={text} active={active.children} /> : linkText;

    const attr = info.match(/\([^\n]+\)/);

    if(attr === null) return null;
    const attributes = getAttributes(attr[0].substr(1, attr[0].length -2));
    const href = attributes.url ? attributes.url : "#" + attributes.headingId;

    const target = attributes.blank ? "_blank" : undefined;

    return <a target={target} title={attributes.title} href={href}>{link}</a>
}
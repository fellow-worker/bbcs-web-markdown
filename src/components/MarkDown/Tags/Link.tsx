import { head, tail } from "@/util/inline/annotations";
import { getAttributes } from "@/util/inline/attributes";
import { Tag } from "./Tag";
import { TagProps } from "./TagProps";
import { LinkType } from "@/types";
import { Video } from './Video'
import * as Base from '@/components/Base'

export const Link = (props : TagProps) => {
    const { text, active } = props;

    console.log(active);

    const info = active.children ? tail(text,active) : head(text, active);
    const linkText = info.substr(1, info.indexOf("]") - 1);
    const link = active.children ? <Tag {...props} text={text} active={active.children} /> : linkText;

    const attr = info.match(/\([^\n]+\)/);

    if(attr === null) return null;
    const attributes = getAttributes(attr[0].substr(1, attr[0].length -2));

    if(attributes.type === LinkType.Video) return <Video {...attributes} />

    const href = attributes.url ? attributes.url : "#" + attributes.headingId;
    const target = attributes.blank ? true : false;
    return <Base.Hyperlink blank={target} title={attributes.title} href={href}>{link}</Base.Hyperlink>
}
import { getAttributes } from "@/util/inline/attributes";
import { TagProps } from "./TagProps";
import { LinkType } from "@/types";
import { Video } from './Video'
import * as Base from '@/components/Base'
import { getText } from "@/util/inline/annotations";
import { Line } from "./Line";

export const Link = (props : TagProps) => {
    const { active } = props;
    const text = getText(props.text, active);

    const attr = text.substring(text.lastIndexOf('(') + 1, text.length - 1);

    if(attr === null) return null;
    const attributes = getAttributes(attr);

    if(attributes.type === LinkType.Video) return <Video {...attributes} />

    const href = attributes.url ? attributes.url : "#" + attributes.headingId;
    const target = attributes.blank ? true : false;
    return (
        <Base.Hyperlink blank={target} title={attributes.title} href={href}>
            <Content {...props} />
        </Base.Hyperlink>
    );
}

const Content = (props : TagProps) => {
    const { active } = props;
    const text = getText(props.text, active);

    if(!active.children) return <>{text.substr(1, text.indexOf("]") - 1)}</>

    const start = active.children[0].index;
    const end = active.children[0].index + active.children[0].length

    return <Line {...props} start={start} end={end} annotations={active.children}   />
}
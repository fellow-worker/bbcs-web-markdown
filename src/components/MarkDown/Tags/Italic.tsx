import { head, tail } from "@/util/inline/annotations";
import { Tag } from "./Tag";
import { TagProps } from "./TagProps";
import * as Base from '@/components/Base'

export const Italic = (props : TagProps) => {
    const { text, active } = props;

    const start = head(text, active);
    const end = tail(text,active);

    if(!active.children) return <Base.Italic>{start.substr(1,start.length - 2) }</Base.Italic>

    return (
        <Base.Italic>
            {start.substr(1)}
            <Tag {...props} text={text} active={active.children} />
            {end.substr(0, end.length - 1)}
        </Base.Italic>

    )
}
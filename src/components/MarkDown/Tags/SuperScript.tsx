import { head, tail } from "@/util/inline/annotations";
import { Tag } from "./Tag";
import { TagProps } from "./TagProps";
import * as Base from '@/components/Base'

export const SuperScript = (props : TagProps) => {
    const { text, active } = props;

    const start = head(text, active);
    const end = tail(text,active);

    if(!active.children) return <Base.SuperScript>{start.substr(2,start.length - 3) }</Base.SuperScript>

    return (
        <Base.SuperScript>
            {start.substr(2)}
            <Tag {...props} text={text} active={active.children} />
            {end.substr(0, end.length - 1)}
        </Base.SuperScript>
    )
}
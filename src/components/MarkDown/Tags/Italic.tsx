import { head, tail } from "../../../util/inline";
import { Tag } from "./Tag";
import { TagProps } from "./TagProps";

export const Italic = (props : TagProps) => {
    const { text, active } = props;

    const start = head(text, active);
    const end = tail(text,active);

    if(!active.children) return <em>{start.substr(1,start.length - 2) }</em>

    return (
        <em>
            {start.substr(1)}
            <Tag text={text} active={active.children} />
            {end.substr(0, end.length - 1)}
        </em>

    )
}
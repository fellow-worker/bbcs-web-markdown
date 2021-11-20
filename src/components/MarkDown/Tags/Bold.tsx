import { head, tail } from "../../../util/inline";
import { Tag } from "./Tag";
import { TagProps } from "./TagProps";

export const Bold = (props : TagProps) => {
    const { text, active } = props;

    const start = head(text, active);
    const end = tail(text,active);

    if(!active.children) return <strong>{start.substr(2,start.length - 4) }</strong>

    return (
        <strong>
            {start.substr(2)}
            <Tag text={text} active={active.children} />
            {end.substr(0, end.length - 2)}
        </strong>

    )
}
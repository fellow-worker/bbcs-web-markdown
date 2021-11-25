import { TagProps } from "./TagProps";
import * as Base from '../../Base'
import { Line } from "./Line";

export const Italic = (props : TagProps) => {
    const { active, text } = props;

    return (
        <Base.Italic>
            <Line
                {...props}
                text={text}
                annotations={active.children}
                start={active.index + 1}
                end={active.index + active.length - 1}
            />
        </Base.Italic>
    )
}
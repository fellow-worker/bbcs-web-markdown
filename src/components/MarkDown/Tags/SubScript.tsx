import { Line } from "./Line";
import { TagProps } from "./TagProps";
import * as Base from '../../Base'

export const SubScript = (props : TagProps) => {
    const { active, text } = props;

    return (
        <Base.SubScript>
            <Line
                {...props}
                text={text}
                annotations={active.children}
                start={active.index + 2}
                end={active.index + active.length - 1}
            />
        </Base.SubScript>
    )
}
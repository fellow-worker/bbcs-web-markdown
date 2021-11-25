import { Line } from "./Line";
import { TagProps } from "./TagProps";
import * as Base from 'components/Base'

export const SuperScript = (props : TagProps) => {
    const { active, text } = props;

    return (
        <Base.SuperScript>
            <Line
                {...props}
                text={text}
                annotations={active.children}
                start={active.index + 2}
                end={active.index + active.length - 1}
            />
        </Base.SuperScript>
    )
}
import { TagProps } from "./TagProps";
import * as Base from '@/components/Base'
import { Line } from "./Line";

export const Bold = (props : TagProps) => {
    const { active, text } = props;

    return (
        <Base.Strong>
            <Line
                {...props}
                text={text}
                annotations={active.children}
                start={active.index + 2}
                end={active.index + active.length - 2}
            />
        </Base.Strong>
    )
}
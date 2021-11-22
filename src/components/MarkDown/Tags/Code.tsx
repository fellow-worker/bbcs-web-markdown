import { head } from "@/util/inline/annotations";
import { TagProps } from "./TagProps";
import * as Base from '@/components/Base'

export const Code = (props : TagProps) => {
    const { text, active } = props;

    active.children = undefined;
    let code = head(text, active);
    const first = code[0];
    code = code.substr(2, code.length - 3).replace("\\`","`");

    return (
        <>{first}<Base.Code>{code}</Base.Code></>
    )
}
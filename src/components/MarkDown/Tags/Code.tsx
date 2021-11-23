import { TagProps } from "./TagProps";
import * as Base from '@/components/Base'
import { getText } from "@/util/inline/annotations";

export const Code = (props : TagProps) => {
    const { text, active } = props;

    let code = getText(text, active);
    const first = code[0];
    code = code.substr(2, code.length - 3).replace("\\`","`");

    return (
        <>{first}<Base.Code>{code}</Base.Code></>
    )
}
import { head } from "../../../util/inline";
import { TagProps } from "./TagProps";

export const Code = (props : TagProps) => {
    const { text, active } = props;

    active.children = undefined;
    let code = head(text, active);
    code = code.substr(2, code.length - 3).replace("\\`","`");

    return (
        <code>{code}</code>
    )
}
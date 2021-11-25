import { getText } from "../../../util/inline/annotations";
import { TagProps } from "./TagProps";
import * as Base from '../../Base'

export const Reference = ( props : TagProps ) => {
    const { text, active, document } = props;

    let label = getText(text, active);
    label = label.substr(2, label.indexOf(']') - 2);

    const ref = document.footnotes.findIndex(text => text === label) + 1;
    if(ref === 0) return null;

    return (
        <Base.Reference reference={ref} />
    )
}
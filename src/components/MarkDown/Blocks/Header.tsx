import { Inline } from "../Inline";
import { BlockProps } from './BlockProps'
import * as Base from '@/components/Base'
import { getText } from '@/util/block/header'

export const Header = (props : BlockProps) => {
    const { block } = props;
    const level = block.text.indexOf(' ');
    const [ text, id ] = getText(block.text, level);
    if(text === "") return null;

    return (
        <Base.Header level={level} id={id}>
            <Inline {...props} text={text} />
        </Base.Header>
    )
}
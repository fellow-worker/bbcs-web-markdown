import { Inline } from "../Inline";
import { BlockProps } from './BlockProps'
import * as Base from '@/components/Base'
import { getText } from '@/util/block/header'

export const AltHeader = (props : BlockProps) => {
    const lines = props.block.text.split("\n");
    const level = lines[1][0] === '=' ? 1 : 2;
    const [ text, id ] = getText(lines[0], level);

    return (
        <Base.Header level={level} id={id}>
            <Inline {...props} text={text} />
        </Base.Header>
    )
}
import { BlockProps } from './BlockProps'
import * as Base from '../../Base'

export const Code = (props : BlockProps) => {
    const { block } = props;
    const code = block.text.substr(1, block.text.length - 2);
    return <Base.Code>{code}</Base.Code>
}
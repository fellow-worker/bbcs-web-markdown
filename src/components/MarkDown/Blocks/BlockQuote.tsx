import { MarkDownBase } from "../MarkDown";
import { BlockProps } from './BlockProps'
import * as Base from '@/components/Base'

export const BlockQuote = (props : BlockProps) => {
    const { block, onVerseClick } = props;
    if(!block?.blocks) return null;

    const document = {
        blocks : block.blocks,
        footnotes : props.document.footnotes
    }

    return (
        <Base.BlockQuote>
            <MarkDownBase document={document} onVerseClick={onVerseClick}  />
        </Base.BlockQuote>
    )
}
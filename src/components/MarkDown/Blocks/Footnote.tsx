import { BlockProps } from './BlockProps'
import { Block } from '../Block'
import * as Base from '../../Base'

export const Footnote = (props : BlockProps) => {
    const { document, block } = props;

    const ref = document.footnotes.findIndex(text => text === block.text) + 1;

    // If no ref can be found, return
    if(ref === 0) return null;

    return (
        <Base.Footnote reference={ref}>
            { block.blocks?.map(block => <Block key={block.text} {...props} block={block} />) }
        </Base.Footnote>
    )
}
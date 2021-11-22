import { BlockProps } from './BlockProps'
import { Block } from '../Block'
import styled from 'styled-components';

export const Footnote = (props : BlockProps) => {
    const { document, block } = props;

    const ref = document.footnotes.findIndex(text => text === block.text) + 1;

    // If no ref can be found, return
    if(ref === 0) return null;

    return (
        <Container id={`footnote_${ref}`}>
            <Ref><p><a className="footnote" href={`#reference_${ref}`} >{ref}</a>.</p></Ref>
            <Blocks>
                { block.blocks?.map(block => <Block key={block.text} {...props} block={block} />) }
            </Blocks>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: row;
`

const Ref = styled.div`
    flex: 0 0 28px;
    p { margin-bottom: 0; }
`
const Blocks = styled.div`
    flex: 1 1 auto;

    & :last-child {  margin-bottom: 0; }
`
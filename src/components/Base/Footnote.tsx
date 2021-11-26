import styled from 'styled-components';
import { Props } from './Props';

type FootnoteProps = Props & { reference : number}

export const Footnote = (props : FootnoteProps) => {
    const { reference, children } = props;

    return (
        <Container className="footnote" id={`footnote_${reference}`}>
            <Ref><p><a className="footnote" href={`#reference_${reference}`} >{reference}</a>.</p></Ref>
            <Blocks>{children}</Blocks>
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
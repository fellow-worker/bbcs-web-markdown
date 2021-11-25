import { Document } from "types";
import { parse } from '../../util/block/parser'
import { Block } from "./Block";
import * as Base from '../Base'

type MarkDownProps = {
    content? : string
    onVerseClick? : (ref : string) => any
}

export const MarkDown = (props : MarkDownProps) => {
    const { content } = props;
    if(!content) return null;
    const document = parse(content)

    const onVerseClick = (ref : string) => {
        if(props.onVerseClick) props.onVerseClick(ref);
    }

    return <MarkDownBase document={document} onVerseClick={onVerseClick} />
}

type MarkDownBaseProps = {
    document : Document
    onVerseClick : (ref : string) => any
}

export const MarkDownBase  = (props : MarkDownBaseProps) => {
    const { document } = props;
    return (
        <Base.Wrapper>
            { document.blocks.map((block,index) => <Block {...props} key={index} block={block} />) }
            <Base.Clear />
        </Base.Wrapper>
    )
}
import styled from "styled-components";
import { Document } from "@/types";
import { parse } from '@/util/block/parser'
import { Block } from "./Block";
import * as Base from '@/components/Base'

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
        <Wrapper>
            { document.blocks.map((block,index) => <Block {...props} key={index} block={block} />) }
            <Base.Clear />
        </Wrapper>
    )
}

const Wrapper = styled.div`

    p.left { text-align: left; }
    p.right { text-align: right; }
    p.center { text-align: center; }
    p.justify { text-align: justify }

    img {
        max-width: 100%;
    }

    img.left { float:left; padding-right: 8px; }
    img.right { float:right; padding-left: 8px; }

    a {
        border-width: 0xp;
    }
`
import styled from "styled-components";
import { Block } from "./Block";
import { Clear } from "./Blocks";

export const MarkDown = (props : { content? : string }) => {
    return <MarkDownBase inner={false} content={props.content} />
}

export const MarkDownBase  = (props : { content? : string, inner : boolean }) => {

    if(!props.content) return null;
    const blocks = props.content
        .replace(/\r/g,'')
        .replace(/\n{3,}/g,"\n\n")
        .trim().split("\n\n");

    return (
        <Wrapper>
            {blocks.map((text,index) => <Block inner={props.inner} key={index} text={text} />)}
            <Clear />
        </Wrapper>
    )
}

const Wrapper = styled.div`

    p.left { text-align: left; }
    p.right { text-align: right; }
    p.center { text-align: center; }

    img {
        max-width: 100%;
    }

    img.left { float:left; padding-right: 8px; }
    img.right { float:right; padding-left: 8px; }

    a {
        border-width: 0xp;
    }

`


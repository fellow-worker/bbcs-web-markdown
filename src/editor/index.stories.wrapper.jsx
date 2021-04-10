import { useState } from 'react'
import styled from 'styled-components';
import { Editor } from  './index'

const Wrapper = () => {

    const [ content, setContent ] = useState();

    const onChange = (update) => {
        setContent(update);
    }

    const text = JSON.stringify(content,null,3);
    return (
        <div>
            <Editor onChange={onChange} />
            <Code>
                {text}
            </Code>
        </div>
    )
}

const Code = styled.div`
    white-space: pre-wrap;
    width:100%;
    margin-top:10px;
    border: 1px solid rgba(0,0,0,.1)!important;
    padding:4px;
    box-sizing:border-box;
    color: #222222;
    font-family:Consolas,Monaco,Lucida Console,Liberation Mono,DejaVu Sans Mono,Bitstream Vera Sans Mono,Courier New;
    font-size:12px;
`

export default Wrapper;
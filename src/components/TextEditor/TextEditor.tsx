import { ChangeEvent, useRef, useState } from "react";
import styled, { css } from "styled-components";
import { Highlighter } from './Syntax/Highlighter'

export type TextEditorProps = {
    value : string
    onChange? : (value : string) => void
    onCursorMove? : (position : { start : number, end : number }) => void;
    highlighted? : boolean
}

export const TextEditor = (props : TextEditorProps) => {
    const { onCursorMove, highlighted } = props;
    const ref = useRef<HTMLTextAreaElement>(null);
    const [ value, setValue ] = useState(props.value);

    const onHandleSelection = () => {
        if(!onCursorMove || !ref.current) return;
        const position = { start: ref.current.selectionStart, end: ref.current.selectionEnd };
        onCursorMove(position);
    }

    const onChange = (event : ChangeEvent<HTMLTextAreaElement>) => {
        if(props.onChange) props.onChange(event.target.value);
        else setValue(event.target.value);
        onHandleSelection();
    }

    return (
        <Panel>
            <Highlighter enabled={highlighted} text={value} styled={style} />
            <TextArea
                spellCheck={false}
                value={value}
                onChange={onChange}
                onKeyUp={onHandleSelection}
                onClick={onHandleSelection}
                ref={ref}
            />
        </Panel>
    )
}

const Panel  = styled.div`
    padding:0;
    width:100%;
    position: relative;
`

const style = css`
    padding: 15px;
    font-family: 'ecs-editor-font', 'Courier New', Courier, monospace;
    letter-spacing: 0.1px;
    box-sizing: border-box;
    line-height: 25.844px;
    font-size: 14px;
    border:0;
    margin:0;
    white-space: pre-wrap;
    min-height:25px;
`



const TextArea = styled.textarea`
    ${style}

    &:focus {
        outline: none;
        outline-style: none;
    }

    &:-internal-autofill-selected {
        outline: none;
        outline-style: none;
    }

    content: attr(data-replicated-value) " ";
    display:block;
    resize: none;
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: absolute;
    background-color: transparent;
    top:0;
    left:0;
    right: 0;
    bottom:0;
    color:transparent;
    caret-color:black;
`



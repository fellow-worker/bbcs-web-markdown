import { ChangeEvent, useRef } from "react";
import styled, { css } from "styled-components";
import { Highlighter } from './Syntax/Highlighter'

export type TextEditorProps = {
    value : string
    onChange : (value : string) => void
    onCursorMove? : (position : { start : number, end : number }) => void;
    highlighted? : boolean;
    font? : 'Noto Sans Mono' | 'Roboto Mono' | 'JetBrains Mono';
}

export const TextEditor = (props : TextEditorProps) => {
    const { onCursorMove, highlighted, value } = props;
    const ref = useRef<HTMLTextAreaElement>(null);

    const onHandleSelection = () => {
        if(!onCursorMove || !ref.current) return;
        const position = { start: ref.current.selectionStart, end: ref.current.selectionEnd };
        onCursorMove(position);
    }

    const onValueChange = (event : ChangeEvent<HTMLTextAreaElement>) => {
        props.onChange(event.target.value);
        onHandleSelection();
    }

    const font = props.font ? props.font : 'ecs-editor-font';

    return (
        <Panel>
            <Highlighter font={font} enabled={highlighted} text={value + "\n"} styled={style} />
            <TextArea
                spellCheck={false}
                value={value}
                onChange={onValueChange}
                onKeyUp={onHandleSelection}
                onClick={onHandleSelection}
                ref={ref}
                font={font}
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
    letter-spacing: 0.1px;
    box-sizing: border-box;
    font-size: 14px;
    border:0;
    margin:0;
    white-space: pre-wrap;
    min-height:25px;
`

const TextArea = styled.textarea<{font : string }>`
    ${style}

    &:focus {
        outline: none;
        outline-style: none;
    }

    font-family: '${p =>  p.font}', 'Courier New', Courier, monospace;

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



import styled, { css } from "styled-components";

type TextEditorProps = {
    value : string
    onChange? : (value : string) => void
}

export const TextEditor = (props : TextEditorProps) => {
    const { value, onChange } = props;
    return (
        <Panel>
            <AutoGrow>{value}</AutoGrow>
            <TextArea
                value={value}
                onChange={onChange}
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
`

const AutoGrow = styled.div`
    ${style}
    width: 100%;
    height: 100%;
    visibility: hidden;
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
    top:0;
    left:0;
    right: 0;
    bottom:0;
`



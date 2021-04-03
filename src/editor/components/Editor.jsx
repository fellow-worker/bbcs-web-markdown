import { useState, useRef } from 'react'
import styled from 'styled-components'

import { Editor, EditorState, convertToRaw } from 'draft-js';
import { ButtonBar } from './ButtonBar'
import { handleKeyCommand } from '../handles/handleKeyCommand'
import { styleMap } from '../handles/styleMap'
import { handlePastedText } from '../handles/paste'


import { getDecorator } from '../handles/getDecorator'

const RichTextEditor = ({blocks, onChange}) => {

    const decorator = getDecorator();
    const editor = useRef();
    const [editorState, setEditorState] = useState(() => EditorState.createEmpty(decorator));

    const onHandleKeyCommand = (command, editState) => {
		const state = handleKeyCommand(command, editState)
		if (!state) return "not-handled";

		setEditorState(state);
		return "handled";
	};

    const handlePastedTextFn = (text, html) => {
        return handlePastedText(text, html, editorState, setEditorState);
    };

    return (
        <Wrapper>
            <ButtonBar editorState={editorState} setEditorState={setEditorState} editor={editor.current} />
            <Container className="editor">
                <Editor
                    ref={editor}
                    customStyleMap={styleMap}
                    editorState={editorState}
                    onChange={setEditorState}
                    placeholder="Voeg hier je tekst in.."
                    handleKeyCommand={onHandleKeyCommand}
                    handlePastedText={handlePastedTextFn}
                />
            </Container>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    background-color: #ffffff;
    border: 1px solid rgba(0,0,0,.1)!important;
`

const Container = styled.div`
    padding: 10px;
`



export default RichTextEditor;
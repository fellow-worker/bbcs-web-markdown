import { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'

import { Editor, EditorState, convertToRaw, convertFromRaw } from 'draft-js';

import { ButtonBar } from './ButtonBar'
import { handleKeyCommand } from '../handles/handleKeyCommand'
import { styleMap } from '../handles/styleMap'
import { handlePastedText } from '../handles/paste'
import { onTab } from '../handles/onTab'

import { getDecorator } from '../handles/getDecorator'
import { removeBlock } from 'util/draftjs';

const getInitialContent = (props) => {
    const decorator = getDecorator();
    if(!props.content) return EditorState.createEmpty(decorator)
    const contentState = convertFromRaw(props.content);
    return EditorState.createWithContent(contentState, decorator);
}

const RichTextEditor = (props) => {

    const editor = useRef();
    const wrapper = useRef();
    const [editorState, setEditorState] = useState(getInitialContent(props));

    // This effect will ensure the refs are loaded
    useEffect(() => {
        if(!wrapper?.current) return;
        wrapper.current.addEventListener('delete-block', onDeleteBlock, true);
        return () => {
            if(!wrapper?.current) return;
            wrapper.current.removeEventListener('delete-block', onDeleteBlock, true);
        };
    });

    // Unfortunately, block removal of blocks within block toolbars is not possible direct so the anti pattern of events has to be used.
    const onDeleteBlock = (event) => {
        const { blockKey } = event.detail;
        const state  = removeBlock(editorState, blockKey);
        if(state) onChange(state);
    }

    const onHandleKeyCommand = (command, editState) => {
		const state = handleKeyCommand(command, editState)
		if (!state) return "not-handled";
		onChange(state);
		return "handled";
	};

    const handlePastedTextFn = (text, html) => {
        return handlePastedText(text, html, editorState, onChange);
    };

    const onTabHandle = (event) => {
        const state = onTab(event,editorState);
        if(state !== null) onChange(state);
    }

    const onChange = (state) => {
        setEditorState(state);
        if(props.onChange) props.onChange(convertToRaw(state.getCurrentContent()));
    }

    return (
        <Wrapper ref={wrapper} className="editor-wrapper">
            <ButtonBar
                onImageModalRequest={props.onImageModalRequest}
                onFileModalRequest={props.onFileModalRequest}
                editorState={editorState}
                setEditorState={onChange} editor={editor.current}
            />
            <Container className="editor">
                <Editor
                    ref={editor}
                    customStyleMap={styleMap}
                    editorState={editorState}
                    onChange={onChange}
                    placeholder="Voeg hier je tekst in.."
                    handleKeyCommand={onHandleKeyCommand}
                    handlePastedText={handlePastedTextFn}
                    onTab={onTabHandle}
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
import { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import { removeBlock } from 'util/draftjs';
import { Editor, convertToRaw } from 'draft-js';

import * as handles from '../handles'
import { ButtonBar } from './ButtonBar'
import { getConfig } from '../config'

const RichTextEditor = props => {

    const editor = useRef();
    const wrapper = useRef();
    const [editorState, setEditorState] = useState(handles.getInitialContent(props.content));
    const config = getConfig(props.config);

    // This effect will ensure the refs are loaded
    useEffect(() => {
        if (!wrapper?.current) return;
        wrapper.current.addEventListener('delete-block', onDeleteBlock, true);
        return () => {
            if (!wrapper?.current) return;
            wrapper.current.removeEventListener('delete-block', onDeleteBlock, true);
        };
    });

    // Unfortunately, block removal of blocks within block toolbars is not possible direct so the anti pattern of events has to be used.
    const onDeleteBlock = (event) => {
        const { blockKey } = event.detail;
        const state = removeBlock(editorState, blockKey);
        if (state) onChange(state);
    }

    const onHandleKeyCommand = (command, editState) => {
        const state = handles.handleKeyCommand(command, editState)
        if (!state) return "not-handled";
        onChange(state);
        return "handled";
    };

    const onTabHandle = (event) => {
        const state = handles.onTab(event, editorState);
        if (state !== null) onChange(state);
    }

    const onChange = (state) => {
        setEditorState(state);
        if (props.onChange) props.onChange(convertToRaw(state.getCurrentContent()));
    }

    const handlePastedTextFn = (text, html) => handles.handlePastedText(text, html, editorState, onChange);

    const keyBindingFn = event => handles.keyBindingFn(event, editorState);

    return (
        <Wrapper ref={wrapper} className="editor-wrapper">
            <ButtonBar
                config={config}
                onImageModalRequest={props.onImageModalRequest}
                onFileModalRequest={props.onFileModalRequest}
                editorState={editorState}
                setEditorState={onChange} editor={editor.current}
            />
            <Container className="editor">
                <Editor
                    ref={editor}
                    customStyleMap={handles.styleMap}
                    editorState={editorState}
                    onChange={onChange}
                    placeholder="Voeg hier je tekst in.."
                    handleKeyCommand={onHandleKeyCommand}
                    handlePastedText={handlePastedTextFn}
                    onTab={onTabHandle}
                    keyBindingFn={keyBindingFn}
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
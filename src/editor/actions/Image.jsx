import { Image } from '@styled-icons/material-outlined'
import { EditorState, AtomicBlockUtils } from 'draft-js';

import { Button } from '../components/Button'

export const ImageButton = ({editorState, onChange, editor, onImageModalRequest, show }) => {

    if(show === false) return null;

    const setUrl = (url) => {

        if(url === null) return;
        const state = insertImage(editorState, url);
        onChange(state);
        if(editor) setTimeout(() => editor.focus(), 1);
    }

    const onClick = () => {
        if(onImageModalRequest) onImageModalRequest(setUrl);
        else setUrl(prompt("Please provide the image url"));
    }

    return <Button tooltip="Afbeelding invoegen" onClick={onClick}><Image /></Button>
}

const insertImage = (editorState, url) => {
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity('IMAGE','IMMUTABLE',{ src: url, width : '100%' });
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set( editorState, { currentContent: contentStateWithEntity });
    return AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, ' ');
}

export default ImageButton;
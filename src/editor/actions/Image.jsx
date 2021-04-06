import { Image } from '@styled-icons/material-outlined'
import { EditorState, AtomicBlockUtils } from 'draft-js';

import { Button } from '../components/Button'

export const ImageButton = ({editorState, onChange, editor}) => {

    const onClick = () => {
        const url = prompt("Please provide the image url");
        const state = insertImage(editorState, url);
        onChange(state);
        if(editor) setTimeout(() => editor.focus(), 1);
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
import { Youtube } from '@styled-icons/bootstrap'
import { EditorState, AtomicBlockUtils } from 'draft-js';

import { Button } from '../components/Button'

export const YoutubeButton = ({editorState, onChange, editor}) => {

    const onClick = () => {
        const url = prompt("Please provide the youtube url");
        const state = insertYoutube(editorState, getVideoId(url));
        onChange(state);
        if(editor) setTimeout(() => editor.focus(), 1);
    }

    return <Button tooltip="Youtube filmpje invoegen" onClick={onClick}><Youtube /></Button>
}

const getVideoId = (url) => {
    if(url.includes("https://") === false) return url;
    const urlObject = new URL(url);
    const params = new URLSearchParams(urlObject.search);
    return params.get("v");
}

const insertYoutube = (editorState, videoId) => {
    console.log(videoId);
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity('YOUTUBE','IMMUTABLE',{ videoId: videoId });
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set( editorState, { currentContent: contentStateWithEntity });
    return AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, ' ');
}

export default YoutubeButton;
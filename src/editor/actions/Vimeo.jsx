import { VimeoV } from '@styled-icons/fa-brands/VimeoV'
import { insertAtomicBlock,  } from 'util/draftjs';

import { Button } from '../components/Button'

export const VimeoButton = ({editorState, onChange, editor, show}) => {
    if(show === false) return null;

    const onClick = () => {
        const url = prompt("Please provide the vimeo url");
        const videoId = getVideoId(url);
        if(videoId === null) return;
        const state = insertAtomicBlock(editorState,'VIMEO', { videoId: videoId });
        onChange(state);
        if(editor) setTimeout(() => editor.focus(), 1);
    }

    return <Button tooltip="Vimeo filmpje invoegen" onClick={onClick}><VimeoV /></Button>
}

const getVideoId = (url) => {
    if(url.includes("https://") === false) return null;
    const videoId = parseInt(url.replace('https://player.vimeo.com/video/','').replace('https://vimeo.com/',''));
    if(isNaN(videoId)) return null;
    return videoId;
}

export default VimeoButton;
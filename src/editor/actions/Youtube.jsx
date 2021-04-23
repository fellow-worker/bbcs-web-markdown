import { Youtube } from '@styled-icons/bootstrap'
import { Button } from '../components/Button'
import { insertAtomicBlock,  } from 'util/draftjs';

export const YoutubeButton = ({editorState, onChange, editor, show}) => {
    if(show === false) return null;
    const onClick = () => {
        const url = prompt("Please provide the youtube url");
        const videoId = getVideoId(url);
        if(videoId === null) return;
        const state = insertAtomicBlock(editorState, 'YOUTUBE', { videoId: videoId });
        onChange(state);
        if(editor) setTimeout(() => editor.focus(), 1);
    }

    return <Button tooltip="Youtube filmpje invoegen" onClick={onClick}><Youtube /></Button>
}

const getVideoId = (url) => {
    if(url === null) return null;
    if(url.includes("https://") === false) return url;
    const urlObject = new URL(url);
    const params = new URLSearchParams(urlObject.search);
    return params.get("v");
}

export default YoutubeButton;
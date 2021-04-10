import { VideoFrame } from './Video'

const YouTube = ({videoId, width}) => {
    const url = `https://www.youtube.com/embed/${videoId}?autoplay=0`;
    const frameId = `ytplayer-${videoId}`;
    return (
        <VideoFrame frameId={frameId} url={url} width={width} allow="encrypted-media; picture-in-picture" />
    );
}

export default YouTube;
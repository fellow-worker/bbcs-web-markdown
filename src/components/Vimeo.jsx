import { VideoFrame } from './Video'

const Vimeo = ({videoId, width}) => {

    const url = `https://player.vimeo.com/video/${videoId}?autoplay=0`;
    const frameId = `vplayer-${videoId}`;
    return (
        <VideoFrame frameId={frameId} url={url} width={width} allow="encrypted-media; picture-in-picture" />
    );
}

export default Vimeo;
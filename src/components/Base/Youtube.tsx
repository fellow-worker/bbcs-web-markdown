import { VideoContainer } from './VideoContainer'

export const Youtube = (props : { videoId? : string}) => {
    const { videoId } = props;
    if(!videoId) return null;

    return (
        <VideoContainer>
            <iframe
                title="youtube video"
                width="420"
                height="315"
                src={`https://www.youtube.com/embed/${videoId}?controls=1"`}
                allowFullScreen
                frameBorder={0}
            />
        </VideoContainer>
    );
}

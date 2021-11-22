import { VideoContainer } from './VideoContainer'

export const Youtube = (props : { videoId : string}) => {
    return (
        <VideoContainer>
            <iframe
                title="youtube video"
                width="420"
                height="315"
                src={`https://www.youtube.com/embed/${props.videoId}?controls=1"`}
                allowFullScreen
                frameBorder={0}
            />
        </VideoContainer>
    );
}

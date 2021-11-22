import { VideoContainer } from './VideoContainer'

type VideoProps = { url? : string }

export const Video = (props : VideoProps) => {
    const { url } = props;
    return (
        <VideoContainer>
            <video controls><source src={url} type="video/mp4" /></video>
        </VideoContainer>
    )
}


import YouTubeEmbedded from 'components/YouTube'
import Video from './Video'

const YouTube = ({contentState, entityKey, blockKey}) => {

    const { videoId } = contentState.getEntity(entityKey).getData();

    return (
        <Video contentState={contentState} entityKey={entityKey} blockKey={blockKey}>
            <YouTubeEmbedded videoId={videoId} width="100%" />
        </Video>
    )
}

export default YouTube;
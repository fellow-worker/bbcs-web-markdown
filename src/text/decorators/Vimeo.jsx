import VimeoFrame from 'components/Vimeo'
import Video from './Video'

const YouTube = ({contentState, entityKey, blockKey}) => {

    const { videoId } = contentState.getEntity(entityKey).getData();

    return (
        <Video contentState={contentState} entityKey={entityKey} blockKey={blockKey}>
            <VimeoFrame videoId={videoId} width="100%" />
        </Video>
    )
}

export default YouTube;
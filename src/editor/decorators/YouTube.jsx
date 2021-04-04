import YouTubeEmbedded from './../../components/YouTube';

const YouTube = (props) => {

    const { videoId } = props.contentState.getEntity(props.entityKey).getData();
    return <YouTubeEmbedded videoId={videoId} />
};

export default YouTube;